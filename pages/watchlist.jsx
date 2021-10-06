import React from "react";
import Image from "next/image";
import { getItems } from "utils/localStorage";
import Items from "components/Items";
import Box from "@mui/material/Box";

export default function Watchlist() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setItems(getItems());
  }, []);

  if (!items || items.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: `70vh`,
            maxWidth: `100%`,
            flexDirection: `column`,
            p: 1,
            m: 1,
          }}
        >
          <h2>Watchlist is empty</h2>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            flexDirection: `column`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: `100%`,
            height: `100%`,
            p: 1,
            m: 1,
          }}
        >
          <h2>Watchlist</h2>
          <Items
            items={items}
            totalItems={(totalItems) => {
              if (totalItems === 0) {
                setItems([]);
              }
            }}
          />
        </Box>
      </>
    );
  }
}
