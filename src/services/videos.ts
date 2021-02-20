import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

export const getVideos = async (abortSignal: AbortSignal): Promise<ProcessedVideo[]> => {
  

  const [categories, authors] = await Promise.all([
    getCategories(abortSignal),
    getAuthors(abortSignal),
  ]);

  const videos = authors.reduce((acc, {name: author, videos}) => {
    const curVideos: ProcessedVideo[] = videos.map(({id, name, catIds}) => ({
      id,
      name,
      author,
      categories: catIds.map(catId => categories.find(({id}) => id === catId)?.name || ''),
    }));

    return [...acc, ...curVideos];
  }, [] as ProcessedVideo[]);

  return videos;
};

export const filterVideos = (search: string, videos: ProcessedVideo[]) => {
  if (!search) {
    return videos;
  }

  const filtered = videos.filter(({name, author, categories}) => 
    searchString(name, search) || searchString(author, search) || categories.find(cat => searchString(cat, search))
  );

  // TODO: highlight search

  return filtered;
}

const searchString = (target: string, search: string) => target.toLocaleLowerCase().includes(search.toLocaleLowerCase());