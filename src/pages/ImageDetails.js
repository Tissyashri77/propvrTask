import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../common/components/Navbar";
import { fetchImageDetails } from "../common/store/slice/image";
import { VscEye } from "react-icons/vsc";
import { IoHeartOutline, IoStarSharp } from "react-icons/io5";
import Clipboard from "react-clipboard.js";
import { IoMdDownload } from "react-icons/io";
import { GoShare } from "react-icons/go";
import Tooltip from "@mui/material/Tooltip";
import { RWebShare } from "react-web-share";
import { IoStarOutline } from "react-icons/io5";


function ImageDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false)

  const containerStyles = {
    marginTop: 2,
    marginBottom: 4,
  };

  const {
    data: image,
    isLoading: imageLoading,
    isError: imageError,
  } = useSelector((state) => state.imageDetails);

  useEffect(() => {
    dispatch(fetchImageDetails(id));
  }, []);

  useEffect(() => {
    if(!imageLoading && image){
      const data = (JSON.parse(localStorage.getItem('liked')));
      if(data){
        const liked = data.find(function(item){
          return item.id === image.id
        })
        liked && setLiked(true)
      }
    }
  },[imageLoading, liked])

  const handleLikeClick = () => {
    setLiked(!liked);

    const storedLikedItems = JSON.parse(localStorage.getItem('liked')) || [];

    const isImageLiked = storedLikedItems.some((item) => item.id === image.id);

    if (!isImageLiked) {
      const updatedLikedItems = [...storedLikedItems, image];
      localStorage.setItem('liked', JSON.stringify(updatedLikedItems));
    } else {
      const updatedLikedItems = storedLikedItems.filter((item) => item.id !== image.id);
      localStorage.setItem('liked', JSON.stringify(updatedLikedItems));
    }
  };

  if (imageError) {
    return (
      <Grid container justifyContent="center" style={containerStyles}>
        <Typography>Error fetching Images</Typography>
      </Grid>
    );
  }

  if (imageLoading && !imageError) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={containerStyles}
      >
        <CircularProgress color="success" size={50} />
      </Grid>
    );
  }

  const clipboardcopysuccess = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }

  async function download(url) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = `${image.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function onClick() {
    let url = `${image.urls.regular}`;
    console.log(url);
    download(`${url}`);
  }

  return (
    <Box height="100vh">
      <Container>
        <Navbar />
      </Container>

      <Container sx={{ height: "90%" }}>
        {image && (
          <Box display="flex" sx={{flexDirection:{xs:"column",md:"row"}}} height="90%">
            <Box sx={{width:{xs:"100%",md:"50%"}, height:{xs:"60%",md:"100%"}}} >
              {image.urls.regular && (
                <img
                  src={image.urls.regular}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Box>

            <Box
              sx={{width:{xs:"100%",md:"50%"},paddingLeft:{xs:0, md:4}}}
              pt={2}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Typography variant="h5" fontWeight="900" lineHeight={1.3}>
                {image.alt_description}
              </Typography>
              <Typography variant="para" fontWeight="400">
                {image.description}
              </Typography>

              <Typography variant="para" fontWeight="500" mt={2}>
                Author Details:
              </Typography>
              <Box display="flex" flexDirection="column" gap={1} mt={1} pl={1}>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>Name</span>:{" "}
                  {image.user.name}
                </Typography>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>Username</span>:{" "}
                  {image.user.username}
                </Typography>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>From</span>:{" "}
                  {image.location.name || "---"}
                </Typography>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>
                    Total Photos
                  </span>
                  : {image.user.total_photos}
                </Typography>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>Checkout</span>:{" "}
                  <Link to={image.user.links.html}>
                    {image.user.links.html}
                  </Link>
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={1} mt={1}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  bgcolor="#eee"
                  padding={1}
                >
                  <VscEye size={20} />
                  <Typography fontSize={14}>
                    {image.views.toLocaleString()} views
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                  bgcolor="#eee"
                  padding={1}
                >
                  <IoHeartOutline size={16} />
                  <Typography fontSize={14}>
                    {image.likes.toLocaleString()} likes
                  </Typography>
                </Box>

                <Box width="50%" mt={2}>
                  <Typography fontSize={14} fontWeight="500">
                    Link:
                  </Typography>
                  <Clipboard
                    data-clipboard-text="I'll be copied"
                    button-title="I'm a tooltip"
                    onSuccess={clipboardcopysuccess}
                    style={{
                      border: "none",
                      padding: "10px",
                      marginTop: "4px",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Copy Link
                  </Clipboard>
                </Box>

                <Box mt={2}>
                  <Typography fontSize={14} fontWeight="500">
                    Options:
                  </Typography>

                  <Box mt={2} pl={2} display="flex" gap={2} sx={{marginBottom:{xs:4,md:0}}}>
                    <Tooltip title="Download">
                      <Box
                        padding={2}
                        bgcolor="#eee"
                        width={55}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={1}
                        sx={{ cursor: "pointer" }}
                        onClick={onClick}
                      >
                        <IoMdDownload size={24} color="#777777" />
                      </Box>
                    </Tooltip>

                    <Tooltip title="Share">
                      <RWebShare
                        data={{
                          text: `${image.alt_description}`,
                          url: `${image.urls.regular}`,
                          title: "Share Unsplash Image on",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <Box
                          padding={2}
                          bgcolor="#eee"
                          width={55}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius={1}
                          sx={{ cursor: "pointer" }}
                        >
                          <GoShare size={24} color="#777777" />
                        </Box>
                      </RWebShare>
                    </Tooltip>

                    <Tooltip title={liked ? "Liked" : "Like"}>
                      <Box
                        padding={2}
                        bgcolor="#eee"
                        width={55}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={1}
                        sx={{ cursor: "pointer" }}
                        onClick={handleLikeClick}
                      >
                        {
                          liked ? <IoStarSharp size={24} color="#777777" /> : <IoStarOutline size={24} color="#777777" />
                        }
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>

      {show && (
        <Alert
          severity="success"
          color="info"
          sx={{ position: "absolute", bottom: 10, left: 20 }}
        >
          Link Copied successfully 🤩
        </Alert>
      )}
    </Box>
  );
}

export default ImageDetails;
