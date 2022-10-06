import React from 'react'
import {Box, Divider, Grid, Stack, Typography } from '@mui/material'


function Footer() {
  return (
    <Box bgcolor='primary.dark' position="relative"> 
        <Box p={2} marginX='auto' width='fit-content'>
            <Typography variant = "body2" color='primary.white'>Copyright@ 2022 Algo-Vision</Typography>
        </Box>  
    </Box>
  )
}

export default Footer;