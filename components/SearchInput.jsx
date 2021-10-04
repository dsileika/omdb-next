import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import Grid from "@mui/material/Grid";
import BackDropLoading from "./BackDropLoading";

import { useSearch } from "utils/search";

export default function SearchInput() {
  const [showLoading, setShowLoading] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(``);

  async function fetchItems() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { items, isLoading } = await useSearch(currentValue);
    console.log("items: ", items);
  }

  if (showLoading && currentValue && currentValue.length > 2) {
    return <BackDropLoading />;
  }

  return (
    <Grid container>
      <Grid item>
        <Paper
          // component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: `100%`,
          }}
        >
          <InputBase
            defaultValue={``}
            onChange={(event) => {
              const value = event.target.value;
              setCurrentValue(value);
            }}
            sx={{
              ml: 1,
              flex: 1,
              fontWeight: `bold`,
              width: `auto`,
            }}
            onKeyDown={(event) => {
              if (
                event.key === `Enter` &&
                currentValue &&
                currentValue.length > 2
              ) {
                setShowLoading(true);
                fetchItems();
              }
            }}
            placeholder="Search OMDb"
            inputProps={{ "aria-label": "search OMDb" }}
          />
          {/* <IconButton type="submit" sx={{ p: "10px" }} aria-label="search"> */}
          <IconButton
            disabled={currentValue && currentValue.length > 2 ? false : true}
            onClick={() => {
              setShowLoading(true);
              fetchItems();
            }}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
