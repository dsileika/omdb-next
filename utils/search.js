// import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import { getItems } from "./localStorage";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function useSearch(title) {
  const items = await fetcher(`/api/search?s=${title}`);

  // return {
  //   items: data,
  //   isLoading: !data,
  // };

  return items;
}

export function useSWRSearch(title) {
  // const { data, error } = useSWR(`/api/search?s=${title}`, fetcher);
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const { data, error } = useSWRImmutable(`/api/search?s=${title}`, fetcher);

  return {
    items: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function isWatchListItem(imdbID) {
  let isExists = false;
  let watchListItems = getItems();

  if (watchListItems && watchListItems.length > 0) {
    isExists = watchListItems.some(
      (watchListItem) => watchListItem.imdbID === imdbID,
    );
  }

  return isExists;
}
