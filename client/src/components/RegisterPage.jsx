import { useState, useEffect, useRef } from "react";
import TOPOLOGY from "vanta/dist/vanta.topology.min"; // Import Vanta Topology for background effect
import TextField from "@mui/material/TextField";
import { Button, Avatar, Grid, Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";
import axios from "axios";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function RegisterPage() {
  const loginBackgroundRef = useRef(null); // Reference for the login background element

  // Effect hook to initialize the Vanta Topology background effect

  useEffect(() => {
    if (loginBackgroundRef.current) {
      TOPOLOGY({
        el: loginBackgroundRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x8a8a8a,
        backgroundColor: 0x0,
      });
    }
  }, []);

  // Function to handle form submission

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/register", values)
      .then((res) => {
        console.log("Registered successfully");
        // Redirect user to login page after successful registration
        window.location.href = "/";
      })
      .catch((err) => console.log("Error registering:", err.response.data));
  };

  return (
    <Box
      ref={loginBackgroundRef}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline /> {/* Provides consistent styling across browsers */}
      {/* Login box with background blur effect */}
      <Box
        sx={{
          width: "50vw",
          height: "0vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "30px",
          backdropFilter: "blur(2px)",
          backgroundColor: "#161616a6",
        }}
      >
        {/* Fade animation */}
        <Fade in={true} timeout={1500}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Avatar and title */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon sx={{ fill: "#2a2a2a" }} />
            </Avatar>
            <h1>Sign Up</h1>
            {/* Form for user registration */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: 0.75, gap: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* First Name field */}
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    onChange={handleChange}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Last Name field */}
                  <TextField
                    required
                    onChange={handleChange}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Username field */}
                  <TextField
                    required
                    onChange={handleChange}
                    fullWidth
                    id="userName"
                    label="Username"
                    name="username"
                    autoComplete="userName  "
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* First Name field */}
                  <TextField
                    autoComplete="given-name"
                    name="publicKey"
                    required
                    onChange={handleChange}
                    fullWidth
                    id="publicKey"
                    label="Public Key"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Password field */}
                  <TextField
                    required
                    onChange={handleChange}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              {/* Sign up button and link to login */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                  gap: 2,
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
                <Link
                  to={"/"}
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  Already have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}

export default RegisterPage;
