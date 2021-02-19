import { Author } from '../common/interfaces';

export const getAuthors = async (signal: AbortSignal): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors`, {signal});
  const data = await (response.json() as unknown) as Author[];

  return data;
};
