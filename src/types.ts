export type Post = {
  caption: string;
  comments: number;
  id: string;
  imageUrl: string;
  likes: number;
  shares: number;
  thumbnailUrl: string;
  timestamp: string;
  type: 'video' | 'image';
  username: string;
  videoUrl: string;
};
