import React from "react";
import Box from "@mui/material/Box";
import SearchInput from "components/SearchInput";
import { PageTitle } from "utils/config";

export default function Home() {
  return (
    <>
      <Box
        sx={{
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
