import React, { useState } from 'react'; // Import useState from react
import CustomCard from "../Card/CustomCard";
import SideNavbar from "../SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import '../../routes/Dashboard.css'
import Navbar from "../../components/Navbar/Navbar";
import PostForm from "../InputForm/PostForm";


export default function CreatePost() {

    return (
      <>
      
        <div className="body-container">
          <Navbar />
          <Box height={50} />
          <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "5%" }}>
            <SideNavbar />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomCard inputForm={<PostForm />} />
             
              </Grid>
            </Grid>
          </Box>
        </div>
      </>
    );
  }
  

