import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

export const getVideos = async (abortSignal: AbortSignal): Promise<ProcessedVideo[]> => {
  

  const [categories, authors] = await Promise.all([
    getCategories(abortSignal),
    getAuthors(abortSignal),
  ]);

  const moisteredAuthors = authors.reduce((acc, {name: author, videos}) => {
    const curVideos: ProcessedVideo[] = videos.map(({id, name, catIds}) => ({
      id,
      name,
      author,
      categories: catIds.map(catId => categories.find(({id}) => id === catId)?.name || ''),
    }));

    return [...acc, ...curVideos];
  }, <ProcessedVideo[]>[]);

  return moisteredAuthors;
};
