import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

export const getVideos = async (abortSignal: AbortSignal): Promise<ProcessedVideo[]> => {
  

  const [categories, authors] = await Promise.all([
    getCategories(abortSignal),
    getAuthors(abortSignal),
  ]);

  const videos = authors.reduce((acc, {name: author, videos}) => {
    const curVideos = videos.map(({id, name, catIds, size, res, releaseDate}) => ({
      id,
      name,
      author,
      categories: catIds.map(catId => categories.find(({id}) => id === catId)?.name || ''),
      res,
      size,
      releaseDate,
    }));

    return [...acc, ...curVideos] as (ProcessedVideo & {size?: number})[];
  }, [] as (ProcessedVideo & {size?: number})[]);


  const sizeByRes = getSizeByRes(videos);

  return videos as ProcessedVideo[];
};

export const filterVideos = (search: string, videos: ProcessedVideo[]) => {
  if (!search) {
    return videos;
  }

  const filtered = videos.filter(({name, author, categories}) => 
    searchString(name, search) ||
    searchString(author, search) ||
    categories.find(cat => searchString(cat, search))
  );

  // TODO: highlight search

  return filtered;
}

const searchString = (target: string, search: string) => target.toLocaleLowerCase().includes(search.toLocaleLowerCase());

const getSizeByRes = (videos: (ProcessedVideo & {size?: number})[]) => {
  const sizeByRes = new Map<string, Set<number>>();
  videos.forEach(({res, size}) => {
    if (!res || !size) {
      return;
    }

    const sizes = sizeByRes.get(res);
    if (!sizes) {
      sizeByRes.set(res, new Set([size]));
    } else {
      sizes.add(size);
    }
  });

  const sizeByResObj = [...sizeByRes.entries()]
    .reduce((acc, [res, sizes]) => ({
      ...acc,
      [res]: [...sizes].sort()
    }), {});

  return sizeByResObj;
}