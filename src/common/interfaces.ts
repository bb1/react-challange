export type formatType = 'Augenkrebs' | 'medium' | 'best';
export type qualityType = '320p' | '720p' | '1080p' | '4K';

export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  res?: qualityType;
  size?: number;
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  formatName?: formatType;
  res?: qualityType;
  releaseDate?: string;
}
