import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  MenuItem,
  Box,
  Slider,
  Grid,
  Collapse,
  Divider,
} from "@mui/material";
import Grow from "@mui/material/Grow";
import PaginationComponent from "./PaginationComponent";
import CardItem from "./CardItem";
// Support packages
import "../truffle-contract.js";
import Web3 from "web3";
import { ethers } from "ethers";
// Import contract data
import ColorABI from "../contracts/Color.json";
import NFTsABI from "../contracts/NFT.json";
import OwnershipABI from "../contracts/Ownership.json";
import TransactionABI from "../contracts/Transaction.json";
import UploadSaleABI from "../contracts/UploadSale.json";

function valuetext(value) {
  return `${value}`;
}

const SalesProduct = () => {
  const categories = [
    { value: "All categories", label: "All Categories" },
    { value: "Painting", label: "Painting" },
    { value: "Digital", label: "Digital" },
    { value: "Photograph", label: "Photograph" },
  ];

  const publishedDate = [
    { value: "All dates", label: "All Dates" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const [value, setValue] = useState([10, 70]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedDate, setSelectedDate] = useState("All dates");
  const [originalCards, setOriginalCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const username = localStorage.getItem("username");

    fetch(`http://localhost:3001/api/owned?username=${username}`)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API data:", apiData);
        setOriginalCards(apiData.assets);
        setFilteredCards(apiData.assets);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const applyFilter = () => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Price Range:", value);

    const filteredResults = originalCards.filter((card) => {
      console.log("Card Category:", card.category);
      console.log("Card Date:", card.publishDate);
      console.log("Card Price:", card.amount);

      // Apply category filtering
      const categoryMatches =
        selectedCategory === "All categories" ||
        card.category === selectedCategory;
      return categoryMatches;
    });

    // Apply date filtering
    let sortedResults = [...filteredResults];
    if (selectedDate === "oldest") {
      sortedResults.sort(
        (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
      );
    } else if (selectedDate === "newest") {
      sortedResults.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
    }

    // Apply price range filtering
    const [minPrice, maxPrice] = value;
    const priceFilteredResults = sortedResults.filter((card) => {
      const priceInRange = card.amount >= minPrice && card.amount <= maxPrice;
      return priceInRange;
    });

    console.log("Filtered Results:", sortedResults && priceFilteredResults);
    setFilteredCards(sortedResults && priceFilteredResults);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Grow in={true} timeout={1500}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: 0.9,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mx: "auto",
              alignItems: "center",
            }}
          >
            <h1>NFT Products</h1>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<FilterAltOutlinedIcon sx={{ fill: "#2a2a2a" }} />}
              onClick={() => setOpen(!isOpen)}
            >
              Filter
            </Button>
          </Box>
          <Divider />
          <Collapse in={isOpen} timeout={750}>
            <Box
              sx={{
                width: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    id="select-category"
                    select
                    label="CATEGORY"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    variant="filled"
                    sx={{ width: 0.9 }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TextField
                    id="select-date"
                    select
                    label="PUBLISHED DATE"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    variant="filled"
                    sx={{ width: 0.9 }}
                  >
                    {publishedDate.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box width={0.9}>
                    <span>PRICE RANGE</span>
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={value}
                      onChange={handleChange}
                      getAriaValueText={valuetext}
                    />
                    <span>
                      Price: ${value[0]} - ${value[1]}
                    </span>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilter}
                  >
                    Apply Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
          <Box sx={{ width: 1, mx: "auto" }}>
            <Grid container spacing={4}>
              {filteredCards.slice(startIndex, endIndex).map((card, index) => (
                <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
                  <CardItem index={index + 1} item={card} />
                </Grid>
              ))}
            </Grid>
            <PaginationComponent
              cards={filteredCards}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default SalesProduct;
