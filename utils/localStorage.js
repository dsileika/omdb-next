const itemsKey = `favoriteItems`;

export function getItems() {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(itemsKey) || JSON.stringify([])
      : JSON.stringify([]);
  return JSON.parse(items, true);
}

export function updateItems(items) {
  if (typeof window !== "undefined") {
    localStorage.setItem(itemsKey, JSON.stringify(items));
  }
}

export function removeItem(imdbID) {
  const items = getItems();
  const filteredItems = items.filter((item) => {
    return item.imdbID !== imdbID;
  });

  updateItems(filteredItems);
}

export function addItem(newItem) {
  const items = getItems();
  const itemExists = items.some((item) => item.imdbID === newItem.imdbID);
  if (!itemExists) {
    let newItems = items.concat(newItem);
    updateItems(newItems);
  }
}

export function removeItemsStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(itemsKey);
  }
}
