import { Category } from '../common/interfaces';

export const getCategories = async (signal: AbortSignal): Promise<Category[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/categories`, {signal});
  const data = await (response.json() as unknown) as Category[];

  return data;
};
