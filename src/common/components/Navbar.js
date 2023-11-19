import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname;

  return (
    <Box width="100%" height={80} display="flex" alignItems="center" justifyContent="flex-end">
        <Box display="flex" flexDirection="row" gap={5}>
            <Link to="/" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/" ? "underline" : "none"
            }}>Random Images</Link>
            <Link to="/search" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/search" ? "underline" : "none"
            }}>Search Images</Link>
            <Link to="/liked" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/liked" ? "underline" : "none"
            }}>Liked Images</Link>
        </Box>
    </Box>
  )
}

export default Navbar