import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import InputFormCategory from "../components/InputForm/InputFormCategory";
import List from "../components/ListItem/ListItem";
import { useState, useEffect } from "react";
import ProductInputForm from "../components/InputForm/InputFormProducts";
import { Description } from "@mui/icons-material";
import ListPostWithEdit from "../components/ListItem/ListPostWithEdit";

export default function ManagePostPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/viewposts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          console.log("posts fetched successfully:", data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%", marginRight: "0%" }}>
          <SideNavbar />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomCard
                inputForm={<ListPostWithEdit items={posts} title={"Manage Posts"} />}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
