import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "../components/Navbar/Navbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Facebook, Instagram, Password } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FacebookInputForm() {
  const [formData, setFormData] = React.useState({
    username: "",
    PlatformId: 1,
  });

  const [signInData, setSignInData] = React.useState({
    username: "",
  });

  const navigate = useNavigate();

  const onChangeHandle = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(formData);
  };

  const onChangeSignInHandle = (event) => {
    const { id, value } = event.target;
    setSignInData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(signInData);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/fb-form-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Sign-up successful");
        toast.success("Sign-up successful");
        // Optionally, you can redirect the user to another page or show a success message
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        console.error("Sign-up failed:", errorMessage);
        // Show the error message in a toast
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error
    }
  };

  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/fb-form-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([signInData]),
      });

      if (response.ok) {
        console.log("Sign-in successful");
        toast.success("Sign-in successful");
        navigate("/select-category");

        // Optionally, you can redirect the user to another page or show a success message
      } else {
        console.error("Sign-in failed:", response.statusText);
        toast.error("Sign-in failed");
        // Handle error
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle error
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                minWidth: 300,
                margin: "100px 10px 10px 30px",
                height: "83vh",
              }}
            >
              <CardContent>
                <div style={{ textAlign: "center" }}>
                  <h1>Facebook Profile</h1>
                  <Facebook sx={{ fontSize: 150 }} />
                  <form onSubmit={handleSigninSubmit}>
                    <h4>Sign In</h4>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={signInData.username}
                      onChange={(event) => onChangeSignInHandle(event)}
                      fullWidth
                      sx={{ marginBottom: 5 }}
                    />
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => onChangeSignInHandle(event)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        fullWidth
                        label="Password"
                        sx={{ marginBottom: 4 }}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "rgb(22, 25, 18)",
                        color: "#ffffff",
                      }} // Set background color to RGB and text color to white
                      fullWidth
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            <Card
              sx={{
                minWidth: 400,
                margin: "100px 10px 10px 30px",
                height: "83vh",
              }}
            >
              <CardContent>
                <div style={{ textAlign: "center", margin: "25% 0 22% 0" }}>
                  <h1>Sign Up</h1>
                </div>

                <form onSubmit={handleSubmit} fullWidth>
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    onChange={(event) => onChangeHandle(event)}
                    fullWidth
                    value={formData.username}
                    sx={{
                      marginBottom: 5,
                    }}
                  />
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(event) => onChangeHandle(event)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      fullWidth
                      label="Password"
                      sx={{ marginBottom: 4 }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(22, 25, 18)",
                      color: "#ffffff",
                    }} // Set background color to RGB and text color to white
                    fullWidth
                    sx={{ marginBottom: 4 }}
                  >
                    Submit
                  </Button>
                  <ToastContainer />
                </form>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Box>
    </>
  );
}
