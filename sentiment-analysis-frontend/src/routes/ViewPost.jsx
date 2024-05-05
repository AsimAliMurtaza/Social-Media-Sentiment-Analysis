import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import ListPost from "../components/ListItem/ListPost";
import { useState, useEffect } from "react";

export default function PostsPage() {
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
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
          <CustomCard inputForm={<ListPost posts={posts} />} />
        </Box>
      </div>
    </>
  );
}
