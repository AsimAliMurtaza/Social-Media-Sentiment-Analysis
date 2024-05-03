import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "../routes/Dashboard.css";
import CustomCard from "../components/Card/CustomCard";
import CreatePost from "../components/Post/CreatePost";
import PostForm from "../components/InputForm/PostForm";

export default function PostsPage() {
  const features = {
    heading: "Create Posts",
    description: "Add, edit, and delete posts in the database.",
  }

  return (
    <>
      <div className="body-container">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex", marginLeft: "-5%" }}>
          <SideNavbar />
            <CustomCard inputForm={<PostForm/>}/>

        </Box>
      </div>
    </>
  );
}
