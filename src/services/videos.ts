import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo, formatType } from '../common/interfaces';

export const getVideos = async (abortSignal: AbortSignal): Promise<ProcessedVideo[]> => {
  

  const [categories, authors] = await Promise.all([
    getCategories(abortSignal),
    getAuthors(abortSignal),
  ]);

  const videosWithSize = authors.reduce((acc, {name: author, videos}) => {
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


  const sizeByRes = getSizeByRes(videosWithSize);
  const videos = videosWithSize.map(({size, ...video}) => ({
    ...video,
    formatName: getFormatName(sizeByRes, video.res, size)
  }));

  return videos;
};

export const filterVideos = (search: string, videos: ProcessedVideo[]) => {
  if (!search) {
    return videos;
  }

  const filtered = videos
  .filter(({name, author, categories, releaseDate, formatName, res}) => 
    searchString(name, search) ||
    searchString(author, search) ||
    categories.find(cat => searchString(cat, search)) ||
    searchString(formatName, search) ||
    searchString(res, search) || 
    searchString(releaseDate, search)
  )
  .map(video => ({...video})); // copy to allow manipulation

  // highlight search
  filtered.forEach(video => {
    ['author', 'name'].forEach(key => {
      const reg = new RegExp(`(${search})`, 'ig');
      // @ts-ignore
      video[key] = (video[key] as string).replaceAll(reg, `<mark>$1</mark>`);
    });
  });

  return filtered;
}

const searchString = (target: string = '', search: string = '') => target.toLocaleLowerCase().includes(search.toLocaleLowerCase());

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

const QUALITY_LEVELS = ['Augenkrebs', 'medium', 'best'];
const getFormatName = (sizeByRes: any, res?: string, size?: number): formatType | undefined => {
  if (!res || !size) {
    return;
  }

  const sizes = sizeByRes[res];
  const position = sizes.indexOf(size);
  const level = Math.floor(position / sizes.length * 3);

  if (sizes.length === 1) {
    return QUALITY_LEVELS[QUALITY_LEVELS.length - 1] as formatType;
  }

  return QUALITY_LEVELS[level] as formatType;
};
