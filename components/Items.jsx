import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useAppContext } from "context/state";
import {
  addItemToStorage,
  getItemsFromStorage,
  removeItemFromStorage,
} from "utils/localStorage";
import { useRouter } from "next/router";
import { paths } from "utils/paths";
import ItemCard from "./ItemCard";
import SnackBarAlert from "./SnackBarAlert";
import {
  addedToWatchListMessage,
  removedFromWatchListMessage,
} from "utils/config";

export default function Items(props) {
  const { pathname } = useRouter();

  const { updateWatchListItemsCount } = useAppContext();

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(``);

  useEffect(() => {
    if (pathname === paths.watchlist) {
      setItems(getItemsFromStorage());
    } else {
      setItems(props.items);
    }
  }, [pathname, props.items]);

  function updatedWatchListState(buttonState, item) {
    const message =
      buttonState === true
        ? addedToWatchListMessage
        : removedFromWatchListMessage;

    setMessage(message);

    if (buttonState === true) {
      addItemToStorage(item);
    } else {
      removeItemFromStorage(item.imdbID);
    }

    updateWatchListItemsCount();

    if (pathname === paths.watchlist) {
      let latestItems = getItemsFromStorage();
      setItems(latestItems);
      props.totalItems(latestItems.length || 0);
    }
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(3, 1fr)",
          sm: "repeat(2,1fr)",
          xs: "1fr",
        },
        width: "auto",
        maxWidth: "lg",
        gap: 1,
      }}
    >
      <SnackBarAlert message={message} />

      {items.map((item, index) => {
        let delay = 150 * index;
        return (
          <ItemCard
            key={item.imdbID}
            {...item}
            delay={delay}
            updatedWatchListState={(buttonState) =>
              updatedWatchListState(buttonState, item)
            }
          />
        );
      })}
    </Box>
  );
}
