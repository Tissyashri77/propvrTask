import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../common/components/Navbar";
// import SearchBar from "material-ui-search-bar";
import ImageGallery from "../common/components/ImageGallery";
import { useDispatch } from "react-redux";
import { searchImages } from "../common/store/slice/search";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
  };

  return (
    <div>
      <Container>
        <Navbar />
      </Container>

      <Container>
        {/* <SearchBar
          value={search}
          onChange={(newValue) => {
            setCancelClicked(false);
            setSearch(newValue);
          }}
          onCancelSearch={handleCancel}
        /> */}

        <TextField
          label="Search"
          variant="filled"
          size="small"
          fullWidth
          value={search}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <Box mt={1}>
                {search !== "" ? (
                  <IconButton sx={{marginTop:"-10px"}} onClick={() => {
                    setSearch("")
                    setCancelClicked(true)
                  }}>
                    <CancelOutlinedIcon />
                  </IconButton>
                ) : (
                  <SearchIcon />
                )}
              </Box>
            ),
          }}
        />

        {!cancelClicked && search && <ImageGallery from="searchImages" />}

        {search == "" && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={10}
          >
            <Typography>Type something to search images.</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Search;
