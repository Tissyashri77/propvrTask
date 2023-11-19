import { Box, Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../common/components/Navbar";
import SearchBar from "material-ui-search-bar";
import ImageGallery from "../common/components/ImageGallery";
import { useDispatch } from "react-redux";
import { searchImages } from "../common/store/slice/search";

function Search() {
  const [search, setSearch] = useState("");
  const [cancelClicked, setCancelClicked] = useState(false);
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    (query) => {
      dispatch(searchImages({ query }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (search && !cancelClicked) {
      const delay = 500;
      const timeoutId = setTimeout(() => {
        debouncedSearch(search);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [search, debouncedSearch, cancelClicked]);

  const handleCancel = () => {
    setCancelClicked(true);
  };

  return (
    <div>
      <Container>
        <Navbar />
      </Container>

      <Container>
        <SearchBar
          value={search}
          onChange={(newValue) => {
            setCancelClicked(false);
            setSearch(newValue);
          }}
          onCancelSearch={handleCancel}
        />

        {!cancelClicked && search && <ImageGallery from="searchImages" />}

        {search == "" && <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
            <Typography>Type something to search images.</Typography>
          </Box>}
      </Container>
    </div>
  );
}

export default Search;
