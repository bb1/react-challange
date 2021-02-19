import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

export const getVideos = async (abortSignal: AbortSignal): Promise<ProcessedVideo[]> => {
  

  const [categories, authors] = await Promise.all([
    getCategories(abortSignal),
    getAuthors(abortSignal)
  ]);

  return [];

};
