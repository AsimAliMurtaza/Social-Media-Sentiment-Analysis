import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const MainPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [platform, setPlatform] = useState("");
  const [gender, setGender] = useState("");
  const [engagerId, setEngagerId] = useState(); // State to store the engagerId
  const [platformId, setPlatformId] = useState();
  const [redirectTo, setRedirectTo] = useState("");
  const [navTrue, setNavTrue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navTrue) {
      navigate("/postsfeed", { state: { platformId, username, email } });
    }
  }, [navTrue]);

  const handleSignInSignUp = async () => {
    if (!username.trim() || !role) return;

    if (role === "admin") {
      sendToProfile(username, platform === "instagram" ? 12 : 13);
    } else if (role === "engager") {
      sendToProfile(
        username,
        email,
        gender,
        platform === "instagram" ? 12 : 13
      );
    }
  };

  const sendToProfile = async (
    username,
    emailOrPlatformID,
    gender = null,
    platformID = null
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email: role === "engager" ? emailOrPlatformID : null,
          gender: role === "engager" ? gender : null,
          platformID: role === "admin" ? emailOrPlatformID : platformID,
        }),
      });
      if (response.ok) {
        console.log("Data sent to Profile table successfully");
        const data = await response.json();
        const EngagerId = await data.engagerId; // Assuming the backend returns the engagerId

        if (username.trim() !== "" && role === "admin") {
          navigate("/viewproducts");
        } else if (username.trim() !== "" && role === "engager") {
          setNavTrue(true);
        }
      } else {
        console.error("Error sending data to Profile table");
      }
    } catch (error) {
      console.error("Error sending data to Profile table:", error);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setEmail("");
    setPlatform("");
    setGender("");
  };

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
    setPlatformId(event.target.value === "instagram" ? 12 : 13);
  };

  if (redirectTo) {
    window.location.href = redirectTo;
    return null;
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Social Media Sentiment Analysis
          </Typography>
          <Card>
            <CardContent
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Select
                value={role}
                onChange={handleRoleChange}
                fullWidth
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="engager">Engager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {role === "engager" && (
                <TextField
                  label="Email (Optional)"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              {role === "engager" && (
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  fullWidth
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              )}
              {role && (
                <Select
                  value={platform}
                  onChange={handlePlatformChange}
                  fullWidth
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Platform
                  </MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                </Select>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignInSignUp}
              >
                Sign In / Sign Up
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default MainPage;
