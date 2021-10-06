import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { paths } from "config/paths";

export default function SearchInput(props) {
  const [showLoading, setShowLoading] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(``);

  const router = useRouter();

  React.useEffect(() => {
    setCurrentValue(props.value);
  }, [props.value]);

  function startSearch() {
    router.push({
      pathname: paths.find,
      query: { q: currentValue },
    });
  }

  return (
    <Box>
      <Box>
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
                startSearch();
              }
            }}
            placeholder={currentValue ? currentValue : "Search OMDb"}
            inputProps={{ "aria-label": "search OMDb" }}
          />
          {/* <IconButton type="submit" sx={{ p: "10px" }} aria-label="search"> */}
          <IconButton
            disabled={currentValue && currentValue.length > 2 ? false : true}
            onClick={() => startSearch()}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
