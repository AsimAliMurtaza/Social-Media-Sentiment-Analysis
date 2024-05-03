import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";
import List from "../components/ListItem/ListItem";
import { useState } from "react";
import ProductInputForm from "../components/InputForm/InputFormProducts";
import { Description } from "@mui/icons-material";

export default function ManagePostPage() {


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
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "0%" }}>
          <SideNavbar />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomCard inputForm={<List items={posts} title={"Manage Posts"} />} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
