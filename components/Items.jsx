import React from "react";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SnackBarTimeout } from "config";

import { addItem, getItems, removeItem } from "utils/localStorage";

import { useRouter } from "next/router";
import { paths } from "config/paths";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Items(props) {
  const { pathname } = useRouter();

  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: "",
  });

  React.useEffect(() => {
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

    if (pathname === paths.watchlist) {
      let latestItems = getItems();
      setItems(latestItems);
      props.totalItems(latestItems.length || 0);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: `95%`,
        p: 1,
        m: 1,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
          maxWidth: `60%`,
        }}
      >
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
    </Box>
  );
}
