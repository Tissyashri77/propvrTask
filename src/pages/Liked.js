import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import ImageGallery from '../common/components/ImageGallery'
import Navbar from '../common/components/Navbar'

function Liked() {
  return (
    <Box>
        <Container>
          <Navbar/>
        </Container>

        <Container>
          <Typography variant='h5' fontWeight="700">Saved Images:</Typography>

          <ImageGallery from="liked"/>
        </Container>
    </Box>
  )
}

export default Liked