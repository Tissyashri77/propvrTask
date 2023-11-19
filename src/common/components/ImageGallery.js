import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoStarOutline } from "react-icons/io5";

function ImageGallery({from}) {
  const {
    data: randomImages,
    isLoading: randomImagesLoading,
    isError: randomImageserror,
  } = useSelector((state) => state.randomImages);
    
  const {
    data: searchImages,
    isLoading: searchImagesLoading,
    isError: searchImagesError,
  } = useSelector((state) => state.searchImages);

  const images = from == "randomImages" ? randomImages : from == "liked" ? JSON.parse(localStorage.getItem('liked')) : searchImages
  const loading = from == "randomImages"  ? randomImagesLoading : from == "liked" ? false : searchImagesLoading
  const error = from  == "randomImages" ? randomImageserror : from == "liked" ? false : searchImagesError


  console.log(images);

  const navigate = useNavigate()

  const containerStyles = {
    marginTop: 2,
    marginBottom: 4,
  };

  const cardStyles = {
    position: "relative",
    height: "100%",
    cursor:"pointer"
  };

  const overlayStyles = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
  };

  const textStyles = {
    fontSize: "10px",
    fontWeight: "bold",
  };

  if (error) {
    return (
      <Grid container justifyContent="center" style={containerStyles}>
        <Typography>Error fetching Images</Typography>
      </Grid>
    );
  }

  if (loading && !error) {
    return (
      <Grid container justifyContent="center" style={containerStyles}>
        <CircularProgress color="success" size={50} />
      </Grid>
    );
  }

  if(images.length == 0 && !loading && !error ){
    return(
      <Box display="flex" alignItems="center" justifyContent="center" mt={10}><Typography>No Images Found</Typography></Box>
    )
  }

  return (
    <Grid container spacing={2} style={containerStyles}>
      {images &&
        images.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card style={cardStyles} onClick={() => {
              navigate(`/images/${item.id}`)
            }}>
              <CardMedia component="img" height="400" image={item.urls.regular} alt={item.alt_description} />
              <CardContent style={overlayStyles}>
                <Box>
                  <Typography variant="h4" style={textStyles}>
                    {item.alt_description}
                  </Typography>
                  <Typography style={textStyles}><span style={{textDecoration:"underline"}}>Downloads</span>: {item.downloads}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IoStarOutline size={20}/>
                  <Typography style={textStyles} fontSize={9}>{item.likes}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default ImageGallery;
