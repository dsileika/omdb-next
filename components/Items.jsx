import React, { useState, useEffect, forwardRef } from "react";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SnackBarTimeout } from "config";
import { useAppContext } from "context/state";

import { addItem, getItems, removeItem } from "utils/localStorage";

import { useRouter } from "next/router";
import { paths } from "config/paths";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Items(props) {
  const { pathname } = useRouter();

  const [items, setItems] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: "",
  });

  useEffect(() => {
    if (pathname === paths.watchlist) {
      setItems(getItems());
    } else {
      setItems(props.items);
    }
  }, [pathname, props.items]);

  const { vertical, horizontal, open, message } = state;

  function handleOpen() {
    setState({ ...state, open: true });
  }

  function handleClose(event) {
    if (event !== null) {
      setState({ ...state, open: false });
    }
  }

  function closeOnTimeout(event) {
    if (event === null) {
      setState({ ...state, open: false });
    }
  }

  function handleMessage(message) {
    setState({
      ...state,
      message: message,
      open: true,
    });
  }

  const { favoriteItems, setFavoriteItems } = useAppContext();

  function updatedWatchListState(buttonState, item) {
    const message =
      buttonState === true
        ? `Added to watchlist! 🌟`
        : `Removed from watchlist! 🧹`;

    handleMessage(message);

    if (buttonState === true) {
      addItem(item);
    } else {
      removeItem(item.imdbID);
    }

    setFavoriteItems(getItems().length);

    if (pathname === paths.watchlist) {
      let latestItems = getItems();
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={SnackBarTimeout}
        open={open}
        key={vertical + horizontal}
        onClose={closeOnTimeout}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", display: `flex`, alignContent: `center` }}
        >
          {message}
        </Alert>
      </Snackbar>

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
