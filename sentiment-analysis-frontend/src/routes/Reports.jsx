import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar.jsx";



export default function Reports() {
  return (
    <>
    <Navbar />
    <Box height={30}/>
    <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Reports</h1>
        <Typography paragraph>
          Welcome to the Reports page.
        </Typography>
      </Box>
    </Box>
    </>
  );
}