import React, { useState, useEffect } from "react";
import { PageTitle } from "config";
import Box from "@mui/material/Box";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import { paths } from "config/paths";
import { useAppContext } from "context/state";

import Link from "next/link";

export default function Header() {
  const { pathname } = useRouter();

  const [favCount, setFavCount] = useState(0);

  const { favoriteItems } = useAppContext();

  useEffect(() => {
    setFavCount(favoriteItems.length);
  }, [favoriteItems]);

  if (pathname === paths.main) {
    return ``;
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          position: `sticky`,
          top: 0,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            flexWrap: "wrap",
            display: "flex",
            justifyContent: `center`,
            alignItems: `center`,
            justifyContent: `space-around`,
            bgcolor: "white",
            gap: 2,
            paddingBottom: 1.5,
          }}
        >
          <Link href={paths.main} passHref>
            <Box>
              <h3>{PageTitle}</h3>
            </Box>
          </Link>
          {pathname !== paths.watchlist && (
            <Link href={paths.watchlist} passHref>
              <Box>
                <Box
                  sx={{
                    display: `flex`,
                    flexDirection: `row`,
                  }}
                >
                  Watchlist
                  <Badge color="primary" badgeContent={favCount} max={10}>
                    <BookmarkIcon />
                  </Badge>
                </Box>
              </Box>
            </Link>
          )}
        </Box>
      </div>
    </>
  );
}
