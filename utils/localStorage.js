import { localStorageKey } from "utils/config";

export function getItemsFromStorage() {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageKey) || JSON.stringify([])
      : JSON.stringify([]);
  return JSON.parse(items, true);
}

function updateItems(items) {
  if (typeof window !== "undefined") {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }
}

export function removeItemFromStorage(imdbID) {
  const items = getItemsFromStorage();
  const filteredItems = items.filter((item) => {
    return item.imdbID !== imdbID;
  });

  updateItems(filteredItems);
}

export function addItemToStorage(newItem) {
  const items = getItemsFromStorage();
  const itemExists = items.some((item) => item.imdbID === newItem.imdbID);
  if (!itemExists) {
    let newItems = items.concat(newItem);
    updateItems(newItems);
  }
}
