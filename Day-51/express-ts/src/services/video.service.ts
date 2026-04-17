import { prisma } from "../utils/prisma";
import { VideoCreateInput, VideoUpdateInput } from "../types/video.type";
import { getYoutubeVideoInfo } from "../utils/youtube";

export const videoService = {
  findAll() {
    return prisma.video.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  find(id: number) {
    return prisma.video.findUnique({
      where: { id },
    });
  },

  async create({ url }: VideoCreateInput) {
    const video = await prisma.video.create({
      data: { url },
    });
  
    videoService.fetchAndUpdate(video.id, url).catch((err) => {
      console.error(`Failed to fetch info for video ${video.id}:`, err);
    });

    return video;
  },

  async fetchAndUpdate(id: number, url: string) {
    const info = await getYoutubeVideoInfo(url);
    if (!info) {
      console.warn(`Could not fetch YouTube info for video ${id}`);
      return null;
    }

    return prisma.video.update({
      where: { id },
      data: {
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration,
        views: info.views,
        likes: info.likes,
        comments: info.comments,
      },
    });
  },

  update(data: VideoUpdateInput, id: number) {
    return prisma.video.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.video.delete({
      where: { id },
    });
  },

  async syncAllVideos() {
    const videos = await prisma.video.findMany();
    console.log(`[Scheduler] Syncing ${videos.length} videos...`);
    for (const video of videos) {
      try {
        const info = await getYoutubeVideoInfo(video.url);
        if (!info) continue;
        const hasChanged =
          info.views !== video.views ||
          info.likes !== video.likes ||
          info.comments !== video.comments;
        if (hasChanged) {
          await prisma.video.update({
            where: { id: video.id },
            data: {
              views: info.views,
              likes: info.likes,
              comments: info.comments,
              title: info.title,
              thumbnail: info.thumbnail,
              duration: info.duration,
            },
          });
          console.log(`[Scheduler] Updated video ${video.id}: ${info.title}`);
        } else {
          console.log(`[Scheduler] No changes for video ${video.id}`);
        }
      } catch (err) {
        console.error(`[Scheduler] Error syncing video ${video.id}:`, err);
      }
    }

    console.log("[Scheduler] Sync completed.");
  },
};