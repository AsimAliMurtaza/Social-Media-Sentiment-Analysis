import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";


export default function Home() {
  return (
    <>
    <Navbar />
    <Box height={30}/>
    <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Home</h1>
        <Typography paragraph>
            Welcome to the Home page.
        </Typography>
      </Box>
    </Box>
    </>
  );
}
