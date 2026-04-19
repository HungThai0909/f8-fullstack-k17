export type VideoCreateInput = {
  url: string;
};

export type VideoUpdateInput = {
  title?: string | null;
  thumbnail?: string | null;
  duration?: string | null;
  comments?: number;
  views?: number;
  likes?: number;
};

export type YoutubeVideoInfo = {
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
};