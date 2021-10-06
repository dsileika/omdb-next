import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { paths } from "utils/paths";
import BackDropLoading from "components/BackDropLoading";
import { fetchSearch } from "utils/search";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // OMDb API call to search
  const fetchItems = useCallback(async (searchQuery, page) => {
    if (searchQuery && page) {
      const itemsResponse = await fetchSearch(searchQuery, page);
      if (itemsResponse) {
        setItems(itemsResponse.Search || []);
        const totalResults = itemsResponse.totalResults || 0;
        if (totalResults > 0) {
          setTotalPages(Math.ceil(totalResults / 10));
        }
      }
      setShowLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentPage = query.page || 1;
    const currentQuery = query.q || ``;

    if (currentQuery && currentQuery.length > 2) {
      setCurrentValue(currentQuery);
    }
    if (currentQuery.length > 2 && currentPage) {
      setShowLoading(true);
      const page = parseInt(currentPage, 10) || 1;
      fetchItems(currentQuery, page);
      setCurrentPage(page || 1);
    }
  }, [query.q, fetchItems, query.page]);

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
          <SearchInput value={currentValue} />
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
          <SearchInput value={currentValue} />
        </Box>
        <Items items={items} />
        {totalPages && (
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
        )}
      </Box>
    );
  }
}
