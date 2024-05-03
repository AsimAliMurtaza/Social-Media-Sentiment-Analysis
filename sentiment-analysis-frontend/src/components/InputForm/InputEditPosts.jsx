import React from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import "../../routes/Dashboard.css";
import CustomCard from "../../components/Card/CustomCard";
import List from "../../components/ListItem/ListItem";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";


export default function EditPosts() {
  const [posts, setPosts] = useState([
    { id: 1, name: "Post 1", description: "Content 1" },
    { id: 2, name: "Post 2", description: "Content 2" },
    { id: 3, name: "Post 3", description: "Content 3" },
    { id: 4, name: "Post 4", description: "Content 4" },
    { id: 5, name: "Post 5", description: "Content 5" },
  ]);
  return (
    <>
      <div className="body-container">
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "0%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <List items={posts}/>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
