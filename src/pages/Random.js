import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomImages } from "../common/store/slice/images";
import Pagination from "@mui/material/Pagination";

import ImageGallery from "../common/components/ImageGallery";
import { Box, Button, Container } from "@mui/material";
import Navbar from "../common/components/Navbar";

function Random() {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1);
  const {
    data: randomImages,
    isLoading: randomImagesLoading,
    isError: error,
  } = useSelector((state) => state.randomImages);


  useEffect(() => {
    dispatch(fetchRandomImages(page));
  }, [page]);


  return (
    <Box>
      <Container>
        <Navbar />
      </Container>

      <Container>
        <ImageGallery from="randomImages"/>
      </Container>

      {!randomImagesLoading && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={4} mt={4}>
          <Pagination size="small" count={10} page={page} onChange={(event, value) => {
            setPage(value)
          }}/>
        </Box>
      )}
    </Box>
  );
}

export default Random;
