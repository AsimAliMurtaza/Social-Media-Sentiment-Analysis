import React from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar.jsx";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar.jsx";

import { useState } from "react";

const Settings = () => {
  // Example state for account information
  const [accountInfo, setAccountInfo] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "C:\\Users\\asim9\\OneDrive\\Desktop\\pfp.png",
  });

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    // Perform upload logic here (e.g., using FormData and fetch)
    console.log("Uploaded file:", file);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., using fetch)
    console.log("Form submitted");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="">
          <Box height={0} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh)",
            }}
          >
            <Card
              sx={{
                minWidth: 400,
                margin: "100px 10px 10px 400px",
                height: "83vh",
              }}
            >
              <CardContent>
                <div style={{ textAlign: "left", margin: "15% 0 10% 0" }}>
                  <h1>Settings</h1>
                </div>
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ marginBottom: 5 }}>Username:</label>
                    <input
                      type="text"
                      value={accountInfo.username}
                      disabled
                      style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ marginBottom: 5 }}>Email:</label>
                    <input
                      type="email"
                      value={accountInfo.email}
                      disabled
                      style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", marginBottom: 5 }}>
                      Profile Picture:
                    </label>
                    <div
                      style={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        marginBottom: 10,
                      }}
                    >
                      <img
                        src={accountInfo.profilePicture}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: 5,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Settings;
