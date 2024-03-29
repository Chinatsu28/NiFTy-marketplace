import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Divider,
  MenuItem,
  Typography,
  Grow,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { jwtDecode } from "jwt-decode";

function AddProduct() {
  const [username, setUsername] = useState("");
  const [accountID, setAccountId] = useState("");
  const [value, setValue] = useState(0);
  const [formUserData, setFormUserData] = useState({});

  const [formUploadAsset, setFormUploadAsset] = useState({
    description: "",
    name: "",
    category: "",
    amount: "",
    imageURL: "",
  });

  const categories = [
    { value: "all-items", label: "All Items" },
    { value: "painting", label: "Painting" },
    { value: "digital", label: "Digital" },
    { value: "photograph", label: "Photograph" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const { accountId, username } = decoded;
      setUsername(username);
      setAccountId(accountId);
      setFormUploadAsset((prevState) => ({
        ...prevState,
        authorId: accountId,
      }));
      setFormUserData((prevState) => ({
        ...prevState,
        username: username,
      }));
    }
  }, []);

  const handleUploadAsset = (e) => {
    const { name, value } = e.target;
    setFormUploadAsset((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/upload-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUploadAsset),
      });
      if (!response.ok) {
        throw new Error("Failed to upload product");
      }
      alert("Product uploaded successfully");
      setFormUploadAsset({
        authorId: `${accountID}`,
        description: "",
        name: "",
        category: "",
        amount: "",
        imageURL: "",
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product");
    }
  };

  const [formData, setFormData] = useState({
    price: 0,
  });

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

  useEffect(() => {
    const calculateCommission = () => {
      const price = parseFloat(formData.price);
      const fee = price * conversionRate * 0.005;
      setCommissionFee(fee);
    };

    calculateCommission();
  }, [formData.price]);

  return (
    <Grow in={true} timeout={2000}>
      <Box
        sx={{
          mt: 15,
          width: 0.9,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmitUpload}>
          <Box
            sx={{
              width: 0.9,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Box
              sx={{
                width: 1,
                display: "flex",
                flexDirection: "row",
                mx: "auto",
                alignItems: "center",
              }}
            >
              <h1>Add New Product</h1>
            </Box>
            <Divider />
            <Box
              sx={{
                width: 0.6,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mx: "auto",
                }}
              >
                <Box sx={{ width: 1 }}>
                  <Box
                    sx={{
                      width: "100%",
                      paddingBottom: "100%",
                      boxShadow: "5px 5px #1a1a1a",
                      position: "relative",
                    }}
                  >
                    <img
                      src="https://source.unsplash.com/random?wallpapers"
                      alt="ava"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <TextField
                id="product-name"
                label="Product Name"
                variant="outlined"
                value={formUploadAsset.name}
                onChange={handleUploadAsset}
                name="name"
              />
              <TextField
                id="product-description"
                label="Product Description"
                variant="outlined"
                multiline
                rows={4}
                value={formUploadAsset.description}
                onChange={handleUploadAsset}
                name="description"
              />
              <TextField
                id="product-category"
                select
                label="Product Category"
                variant="outlined"
                defaultValue=""
                sx={{ width: "100%" }}
                value={formUploadAsset.category}
                onChange={handleUploadAsset}
                name="category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="product-price"
                label="Product Price (ETH)"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
                value={formUploadAsset.amount}
                onChange={handleUploadAsset}
                name="amount"
              />
              <TextField
                id="product-link"
                label="Product Link Image"
                fullWidth
                variant="outlined"
                value={formUploadAsset.imageURL}
                onChange={handleUploadAsset}
                name="imageURL"
              />
              <Typography>
                &#x2022; Commission Fee (0.5%): ${commissionFee.toFixed(2)}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Grow>
  );
}

export default AddProduct;
