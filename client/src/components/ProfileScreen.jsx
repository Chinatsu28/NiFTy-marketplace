import { useState, useEffect } from "react";
import { Box, Grid, Button, Collapse, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [accountId, setAccountId] = useState("");
  const [value, setValue] = useState(0);

  const [formUserData, setFormUserData] = useState({
    firstName: "",
    lastName: "",
    publicKey: "",
    password: "",
  });

  useEffect(() => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      // Extract the username and accountId from the decoded payload
      const { accountId, username } = decoded;
      // Set the username and accountId in the state
      setUsername(username);
      setAccountId(accountId);
      // Update the authorId in the form state

      setFormUserData((prevState) => ({
        ...prevState,
        username: username,
      }));
    }
  }, []);

  // State variables

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setFormUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmitUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include your authentication token here if required
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formUserData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // State variables for form data and slider value
  const [formData, setFormData] = useState({
    price: 0, // Initialize price state
  });

  // Extract name and gender from form data
  const { name, gender } = formData;

  const formDataObj = new FormData();
  formDataObj.append("name", name);
  formDataObj.append("gender", gender);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const conversionRate = 2400;

  const [commissionFee, setCommissionFee] = useState(0);

  // Effect to calculate commission fee based on price
  useEffect(() => {
    // Calculate commission fee whenever price changes
    const calculateCommission = () => {
      const price = parseFloat(formData.price);
      const fee = price * conversionRate * 0.005; // 0.5% commission fee
      setCommissionFee(fee);
    };

    calculateCommission();
  }, [formData.price]);

  return (
    <>
      {/* Background image */}
      <Box
        sx={{
          mt: 12,
          width: 1,
          height: "300px",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <img
          src="src\assets\bg\bg-image-19.jpg"
          alt=""
          style={{ objectFit: "fit", width: "100%" }}
        />
      </Box>
      {/* Profile header */}
      <Box
        sx={{
          mt: -12,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          gap: 2,
        }}
      >
        <Box sx={{ mx: "auto" }}>
          <img
            src="src\assets\Capture.jpg"
            alt="ava"
            style={{
              width: "200px",
              borderRadius: "5px",
              boxShadow: "5px 5px #2a2a2a8a",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <h2 style={{ margin: 0 }}>
            <b>{username}</b>
          </h2>
        </Box>
      </Box>
      {/* Content section */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 0.8,
          gap: 2,
        }}
      >
        {/* Buttons for section navigation */}

        {/* Section content */}
        {/* User Info section */}
        <Collapse in={true} timeout={1000}>
          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <form onSubmit={handleSubmitUserData}>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid
                  item
                  xs={8}
                  sx={{
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <h3>Personal Info</h3>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={formUserData.firstName}
                        onChange={handleChangeUserData}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={formUserData.lastName}
                        onChange={handleChangeUserData}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="publicKey"
                        label="Public Key"
                        name="publicKey"
                        autoComplete="publicKey"
                        value={formUserData.publicKey}
                        onChange={handleChangeUserData}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <h3>Account</h3>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        placeholder=""
                        type="password"
                        value={formUserData.password}
                        onChange={handleChangeUserData}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}

export default ProfileScreen;
