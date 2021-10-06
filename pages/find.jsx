import React from "react";
import { useRouter } from "next/router";
import BackDropLoading from "components/BackDropLoading";

import { useSearch } from "utils/search";
import { addItem, removeItem } from "utils/localStorage";
import Items from "components/Items";
import { Box } from "@mui/system";
import SearchInput from "components/SearchInput";

export default function Find() {
  const { query } = useRouter();
  const [showLoading, setShowLoading] = React.useState(true);
  const [currentValue, setCurrentValue] = React.useState(``);
  const [items, setItems] = React.useState([]);
  const [totalResults, setTotalResults] = React.useState(0);

  const fetchItems = React.useCallback(async (searchQuery) => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const itemsResponse = await useSearch(searchQuery);
      setItems(itemsResponse.Search);
      setTotalResults(itemsResponse.totalResults);
      setShowLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (query.q && query.q.length > 2) {
      setShowLoading(true);
      setCurrentValue(query.q);
      const searchQuery = query.q;
      fetchItems(searchQuery);
    }
  }, [fetchItems, query]);

  /*
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { items, isLoading } = await useSearch(currentValue);
    // console.log("items: ", items);
    // addItem({ imdbId: `ff23434` });
    // removeItem(`tt1626038`);
   */

  if (showLoading) {
    return <BackDropLoading />;
  } else if (!items || items.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: `70vh`,
            maxWidth: `90%`,
            flexDirection: `column`,
            p: 1,
            m: 1,
          }}
        >
          <h2>Not found any match</h2>
          <SearchInput value={query.q} />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: `column`,
            p: 1,
            m: 1,
          }}
        >
          <h3>Results for</h3>
          <SearchInput value={query.q} />
        </Box>
        <Items items={items} />
      </>
    );
  }
}
