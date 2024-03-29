import { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ImageCarousel from "./CarouselComponent";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import CardItem from "./CardItem";

// Dashboard component
function Dashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3001/api/assets")
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API data:", apiData);
        setCards(apiData.assets);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      {/* Main container for the dashboard */}
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
        {/* Image carousel component */}
        <div style={{ width: "auto", height: "auto", margin: "0 auto" }}>
          <ImageCarousel />
        </div>
        {/* Section for exploring products */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
          }}
        >
          {/* Header for the explore section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 0.9,
            }}
          >
            <h1>Explore Product</h1>
            {/* Link to the explore page */}
            <Link to="/explore" style={{ textDecoration: "none" }}>
              {/* Button to view all products */}
              <Button onClick={() => console.log("Button clicked")}>
                View All →
              </Button>
            </Link>
          </Box>
          {/* Grid for displaying product cards */}
          <Grow in={true} timeout={2500}>
            <Box sx={{ width: 0.9, mx: "auto" }}>
              <Grid container spacing={4}>
                {/* Map through the cards array and render CardItem component */}
                {cards.map((card, index) => (
                  <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
                    <CardItem index={index} item={card} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grow>
        </Box>
      </Box>
    </Fade>
  );
}

export default Dashboard;
