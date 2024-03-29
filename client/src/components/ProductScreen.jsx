import React from "react";
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Slide,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubjectIcon from "@mui/icons-material/Subject";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function ProductScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [accountId, setAccountId] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const { accountId } = decoded;

          setAccountId(accountId);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  const item = {
    index: queryParams.get("index"),
    imageURL: queryParams.get("imageURL"),
    name: queryParams.get("name"),
    username: queryParams.get("username"),
    price: parseFloat(queryParams.get("amount")),
    description: queryParams.get("description"),
    publishDate: queryParams.get("publishDate"),
    assetID: queryParams.get("assetID"),
  };
  console.log("Query parameters:", item);

  const handleBuyClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assetId: item.assetID,
          accountId: accountId,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show success notification
      alert("Purchase successful!");
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      alert("Failed to purchase product");
    }
  };

  return (
    <Slide in={true} timeout={1500}>
      <Box
        sx={{
          mt: 13,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 0.9,
          gap: 5,
        }}
      >
        <ToastContainer />
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="div"
              sx={{
                width: 1,
                pt: "56.25%", // Aspect ratio 16:9
              }}
              image={item ? item.imageURL : "Product Image"}
            />
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <SubjectIcon />
                Description
              </AccordionSummary>
              <AccordionDetails>
                {item ? item.description : "Product Name"}
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography variant="h2">
                {item ? item.name : "Product Name"}
              </Typography>
              <Typography variant="h8" color="#6A6A6A">
                Published Date: ${item ? item.publishDate : "N/A"}
              </Typography>
              <Typography variant="h4">
                {`@ ${item ? item.username : "Author"}`}
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {`Value (HETH): ${item ? item.price : "N/A"}`}
              </Typography>
            </CardContent>
            <Button
              onClick={handleBuyClick}
              variant="contained"
              color="primary"
            >
              Buy
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Slide>
  );
}

export default ProductScreen;
