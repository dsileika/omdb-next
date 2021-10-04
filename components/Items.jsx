import React from "react";
import ItemCard from "./ItemCard";
import Grid from "@mui/material/Grid";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Items(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(701));

  // if (!items || isLoading) return <div>Loading...</div>;

  // if (isError) return <div>Failed to load</div>;

  return <div></div>;

  return (
    <Grid
      sx={{
        p: `30px 30px`,
        justifyContent: `center`,
      }}
      container
      spacing={{ xs: 2, sm: 5, md: 2 }}
      // columns={{ xs: 12, sm: 8, md: 5, lg: 12 }}
    >
      {items.Search.map((item) => {
        return (
          <Grid
            item
            sx={{
              width: matches ? `100%` : `auto`,
            }}
            key={item.imdbID}
          >
            <ItemCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
}
