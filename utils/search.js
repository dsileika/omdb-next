import axios from "axios";
import { getItemsFromStorage } from "./localStorage";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function fetchSearch(title, page = 1) {
  const items = await fetcher(`/api/search?s=${title}&page=${page}`);
  return items;
}

export function isWatchListItem(imdbID) {
  let isExists = false;
  let watchListItems = getItemsFromStorage();

  if (watchListItems && watchListItems.length > 0) {
    isExists = watchListItems.some(
      (watchListItem) => watchListItem.imdbID === imdbID,
    );
  }

  return isExists;
}
