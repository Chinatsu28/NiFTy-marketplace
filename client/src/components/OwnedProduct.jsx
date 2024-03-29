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
// import "../truffle-contract.js";
import Web3 from "web3";
import { ethers } from "ethers";
// Import contract data
import ColorABI from "../contracts/Color.json";
import NFTsABI from "../contracts/NFT.json";
import OwnershipABI from "../contracts/Ownership.json";
import TransactionABI from "../contracts/Transaction.json";
import UploadSaleABI from "../contracts/UploadSale.json";
import NFTaddress from "../contracts/NFTaddress.json";

function valuetext(value) {
  return `${value}`;
}

const OwnedProduct = () => {
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

  const [value, setValue] = useState([0, 100]);
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
        console.table("API data:", apiData);
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

  // Web3 setup
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  useEffect(() => {
    async function loadWeb3() {
      try {
        // Initialize Web3 with the HTTP provider
        const web3 = new Web3(
          new Web3.providers.HttpProvider("http://34.243.239.33:8545")
        );
        setWeb3(web3);

        // Fetch accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        console.log("Accounts:", accounts);

        // You can also fetch balance or other information here if needed
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance);
        console.log("Balance:", balance);

        const contractABI = OwnershipABI.abi;
        // Corrected the assignment to use setContract function
        const contractInstance = new web3.eth.Contract(contractABI, accounts);
        setContract(contractInstance);

        // Define your provider using your Ethereum node's RPC URL
        const rpcUrl = "http://34.243.239.33:8545";
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        // Use your private key to create a wallet
        const privateKey =
          "6ec039601b7c89d16aaa2eb57d5acf06249c1000433506ce056259f731445ac1";
        const wallet = new ethers.Wallet(privateKey, provider);

        // Connect the wallet to the provider to obtain a signer
        const signer = wallet.connect(provider);

        // loadContracts(signer);
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    }
    loadWeb3();
  }, []);

  // const loadContracts = async (signer) => {
  //   // Get deployed copies of contracts
  //   const marketplace = new ethers.Contract(NFTaddress.address, UploadSaleABI.abi,signer);
  //   setMarketplace(marketplace);
  //   const nft = new ethers.Contract(NFTaddress.address, NFTsABI.abi, signer);
  //   setNFT(nft);
  // };

  // Function to fetch the contract data

  const [listedItems, setListedItems] = useState([]);
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
  };
  useEffect(() => {
    loadListedItems();
  }, []);

  // Filter function
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
          {/* Filter section */}
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

export default OwnedProduct;
