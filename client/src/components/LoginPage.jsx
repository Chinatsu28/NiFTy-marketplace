import { useEffect, useRef, useState } from "react";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";

// LoginPage component
function LoginPage() {
  const loginBackgroundRef = useRef(null);
  // State variables for username, password, and login success
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const tokens = await response.json();
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("username", username);
      console.log("Login successful");
      // Redirect to the explore page or handle authentication state as needed
      window.location.href = "/home";
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Invalid username or password");
    }
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
      <CssBaseline />
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
        <Fade in={true} timeout={1500}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2vh",
              alignItems: "center",
            }}
          >
            <h1>Login</h1>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2vh",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                sx={{ width: 1 }}
                id="Username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                sx={{ width: 1 }}
                id="Password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </form>
            {error && <div>{error}</div>}
            <div>
              <Link
                to={"/register"}
                alt="Register Page"
                style={{ textDecoration: "none" }}
              >
                Haven&apos;t got an account yet? Register now.
              </Link>
            </div>
          </div>
        </Fade>
      </Box>
    </Box>
  );
}

export default LoginPage;
