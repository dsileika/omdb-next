import React from "react";
import Box from "@mui/material/Box";
import SearchInput from "components/SearchInput";

import { PageTitle } from "config";

export default function Welcome() {
  return (
    <>
      <Box
        sx={{
          // background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
          backgroundImage: `url(/top_movies_bg.jpg)`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          backgroundPosition: `center`,
          minWidth: "100%",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              justifyContent: `center`,
              alignSelf: `center`,
              color: `#fff`,
            }}
          >
            <h1>{PageTitle}</h1>
          </Box>
          <Box
            sx={{
              justifyContent: `center`,
              alignSelf: `center`,
              paddingTop: 1,
            }}
          >
            <SearchInput />
          </Box>
        </Box>
      </Box>
    </>
  );
}
