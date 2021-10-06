import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { paths } from "config/paths";
import BackDropLoading from "components/BackDropLoading";
import { useSearch } from "utils/search";
import { addItem, removeItem } from "utils/localStorage";
import Items from "components/Items";
import Box from "@mui/material/Box";
import SearchInput from "components/SearchInput";
import Pagination from "@mui/material/Pagination";

export default function Find() {
  const router = useRouter();
  const { query } = router;
  const [showLoading, setShowLoading] = useState(true);
  const [currentValue, setCurrentValue] = useState(``);
  const [items, setItems] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // OMDb API call to search
  const fetchItems = useCallback(async (searchQuery, page) => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const itemsResponse = await useSearch(searchQuery, page);
      setItems(itemsResponse.Search);
      setTotalResults(itemsResponse.totalResults);
      setShowLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.q && query.q.length > 2) {
      setShowLoading(true);
      setCurrentValue(query.q);
      setTotalPages(Math.ceil(totalResults / 10));
      const searchQuery = query.q;
      const page = parseInt(query.page, 10) || 1;
      fetchItems(searchQuery, page);
      console.log(query);
      setCurrentPage(page || 1);
    }
  }, [fetchItems, query, totalResults]);

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
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          padding: 1,
        }}
      >
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
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => {
              setCurrentPage(page);
              router.push({
                pathname: paths.find,
                query: { q: currentValue, page: page },
              });
            }}
          />
        </Box>
      </Box>
    );
  }
}
