import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname;

  return (
    <Box width="100%" height={80} display="flex" alignItems="center" justifyContent="flex-end">
        <Box display="flex" flexDirection="row" sx={{gap:{xs:3,md:4}}}>
            <Link to="/" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/" ? "underline" : "none"
            }}>
                <Typography sx={{fontSize:{xs:"12px", md:"16px"},fontWeight:"500"}}>Random Images</Typography>
            </Link>
            <Link to="/search" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/search" ? "underline" : "none"
            }}><Typography sx={{fontSize:{xs:"12px", md:"16px"},fontWeight:"500"}}>Search Images</Typography></Link>
            <Link to="/liked" style={{
                color:"inherit",
                fontWeight:"500",
                textDecoration: currentPath === "/liked" ? "underline" : "none"
            }}><Typography sx={{fontSize:{xs:"12px", md:"16px"},fontWeight:"500"}}>Saved Images</Typography></Link>
        </Box>
    </Box>
  )
}

export default Navbar