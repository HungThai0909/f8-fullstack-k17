import { YoutubeVideoInfo } from "../types/video.type";

export const extractYoutubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export const getYoutubeVideoInfo = async (
  url: string,
): Promise<YoutubeVideoInfo | null> => {
  try {
    const videoId = extractYoutubeVideoId(url);
    if (!videoId) {
      console.error("Cannot extract YouTube video ID from URL:", url);
      return null;
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (apiKey) {
      return await fetchFromYoutubeAPI(videoId, apiKey);
    }

    return await fetchFromOembed(videoId);
  } catch (error) {
    console.error("Error fetching YouTube video info:", error);
    return null;
  }
};

const fetchFromYoutubeAPI = async (
  videoId: string,
  apiKey: string,
): Promise<YoutubeVideoInfo | null> => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    items?: Array<{
      snippet: {
        title: string;
        thumbnails: {
          maxres?: { url: string };
          high?: { url: string };
          medium?: { url: string };
        };
      };
      contentDetails: { duration: string };
      statistics: {
        viewCount?: string;
        likeCount?: string;
        commentCount?: string;
      };
    }>;
  };

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const item = data.items[0]!;
  const thumbnail =
    item.snippet.thumbnails.maxres?.url ||
    item.snippet.thumbnails.high?.url ||
    item.snippet.thumbnails.medium?.url ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const duration = parseDuration(item.contentDetails.duration);

  return {
    title: item.snippet.title,
    thumbnail,
    duration,
    views: parseInt(item.statistics.viewCount ?? "0", 10),
    likes: parseInt(item.statistics.likeCount ?? "0", 10),
    comments: parseInt(item.statistics.commentCount ?? "0", 10),
  };
};

const fetchFromOembed = async (
  videoId: string,
): Promise<YoutubeVideoInfo | null> => {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  const response = await fetch(oembedUrl);
  if (!response.ok) {
    throw new Error(`oEmbed error: ${response.status}`);
  }

  const data = (await response.json()) as {
    title?: string;
    thumbnail_url?: string;
  };

  return {
    title: data.title ?? "Unknown Title",
    thumbnail:
      data.thumbnail_url ??
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    duration: "0",
    views: 0,
    likes: 0,
    comments: 0,
  };
};

const parseDuration = (isoDuration: string): string => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0";

  const hours = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);

  return String(hours * 3600 + minutes * 60 + seconds);
};