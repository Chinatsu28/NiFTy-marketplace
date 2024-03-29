import { Box, TextField, Button, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Fade from "@mui/material/Fade";
import { DataGrid } from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";

// Custom TabPanel component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Define prop types for CustomTabPanel component
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Function to generate accessibility props for tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// WalletPage component
function WalletPage() {
  const [queryParameters] = useSearchParams(); // Get query parameters from URL

  const [transactionNFT, setTransactionNFT] = useState([]);
  const [username, setUsername] = useState("");
  const [accountId, setAccountId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transactionReceiver, setTransactionReceiver] = useState([]);
  const [txtoken, setTxtoken] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [user, setUser] = useState({}); // State to hold the user data
  // State to hold the list of transactions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const { username, accountId, publicKey } = decoded;
          setUsername(username);
          setPublicKey(publicKey);
          setAccountId(accountId);
          console.log(publicKey);
          console.log(decoded);

          const senderResponse = await fetch(
            `http://localhost:3001/api/transaction-sender?sender=${username}`
          );
          const receiverResponse = await fetch(
            `http://localhost:3001/api/transaction-receiver?receiver=${username}`
          );
          const userResponse = await fetch(
            `http://localhost:3001/api/loggedUser?username=${username}`
          );
          const transactionTokenIdResponse = await fetch(
            `http://localhost:3001/api/transaction-token?txtoken=${username}`
          );
          const transactionNFTResponse = await fetch(
            `http://localhost:3001/api/transaction-nft?accountId=${accountId}`
          );

          if (!senderResponse.ok || !receiverResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const senderData = await senderResponse.json();
          const receiverData = await receiverResponse.json();
          const userData = await userResponse.json();
          const txTokenData = await transactionTokenIdResponse.json();
          const transactionNFTData = await transactionNFTResponse.json();
          setTransactionNFT(transactionNFTData.transactionNft);

          setTransactions(senderData.transactionSender);
          setTransactionReceiver(receiverData.transactionReceiver);
          setUser(userData.user);
          setTxtoken(txTokenData.transactionTokenId);

          console.table(senderData.transactionSender);
          console.table(receiverData.transactionReceiver);
          console.log("User State:", user);
          console.log("Transaction NFT State:", transactionNFT);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        // Handle errors here
      }
    };
    fetchData();
  }, [user]);

  const [formData, setFormData] = useState({
    receiver: "",
    amount: 0,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "amount") {
      const newpriceHETH = parseFloat(value); // Parse the entered value to a float
      const newPriceUSD = newpriceHETH * conversionRate; // Calculate USD amount based on HETH Amount and conversion rate
      updatedFormData = {
        ...updatedFormData,
        priceHETH: newpriceHETH,
        priceUSD: newPriceUSD,
      };
    }

    setFormData(updatedFormData);
  };

  // Web3 setup
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
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

        // const contractABI = OwnershipABI.abi;
        // // Corrected the assignment to use setContract function
        // const contractInstance = new web3.eth.Contract(contractABI, accounts);
        // setContract(contractInstance);

        // // Define your provider using your Ethereum node's RPC URL
        // const rpcUrl = "http://34.243.239.33:8545";
        // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        // // Use your private key to create a wallet
        // const privateKey =
        //   "6ec039601b7c89d16aaa2eb57d5acf06249c1000433506ce056259f731445ac1";
        // const wallet = new ethers.Wallet(privateKey, provider);

        // // Connect the wallet to the provider to obtain a signer
        // const signer = wallet.connect(provider);

        // loadContracts(signer);

        // loadContracts(signer);
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    }
    loadWeb3();
  }, []);

  // const loadContracts = async (signer) => {
  //   // Get deployed copies of contracts
  //   const marketplace = new ethers.Contract(
  //     NFTaddress.address,
  //     UploadSaleABI.abi,
  //     signer
  //   );
  //   setMarketplace(marketplace);
  //   const nft = new ethers.Contract(NFTaddress.address, NFTsABI.abi, signer);
  //   setNFT(nft);
  // };

  // Submit form data

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = jwtDecode(token);
        const { username, accountId } = decoded;
        const response = await fetch("http://localhost:3001/api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            accountId: accountId,
            sender: publicKey,
            receiver: formData.receiver,
            amount: formData.amount,
            txtoken: txtoken[0].transactionId,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert(
          "Sent HETH successfully, please refresh the page to see the updated balance"
        );

        // const { _to, _tokenId, _amount } = formData;
        // await contractInstance.methods.sendEtherSafely(_to, _tokenId, _amount).send({ from: accounts[0] });

        setFormData({
          receiver: "",
          amount: 0,
        });

        // You might want to update the transactions list after successful submission
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      // Handle errors here
    }
  };

  // Function to generate a wallet ID using UUIDv4
  function generateWalletId() {
    return `${uuidv4()}`;
  }

  // Function to get the index of the currently open tab
  const getOpenTab = (tabName) => {
    switch (tabName) {
      case "Send":
        return 0;
      case "Receive":
        return 1;
      case "Transactions":
        return 2;
      default:
        return 0;
    }
  };

  // State to manage the currently selected tab value
  const [value, setValue] = useState(getOpenTab(queryParameters.get("open")));

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle changes in USD amount
  const handleUSDChange = (event) => {
    const newPriceUSD = parseFloat(event.target.value); // Parse the entered value to a float
    const newpriceHETH = newPriceUSD / conversionRate; // Calculate HETH Amount based on USD amount and conversion rate
    setFormData({
      ...formData,
      priceUSD: newPriceUSD, // Update the USD amount in formData with the new value
      priceHETH: newpriceHETH, // Update the HETH Amount in formData with the calculated value
    });
  };

  // Define columns for sending transactions
  const columnsSend = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "priceHETH", headerName: "HETH", type: "number", width: 125 },
    { field: "priceUSD", headerName: "USD", type: "number", width: 150 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "receiver", headerName: "To", width: 300 },
  ];

  // Define columns for receiving transactions
  const columnsReceive = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "priceHETH", headerName: "HETH", type: "number", width: 125 },
    { field: "priceUSD", headerName: "USD", type: "number", width: 150 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "sender", headerName: "From", width: 300 },
  ];

  // State for form data

  // Conversion rate for ETH to USD
  const conversionRate = 2400;

  // State for transaction fee
  const [transactionFee, setTransactionFee] = useState(0);

  // Calculate transaction fee whenever price changes
  useEffect(() => {
    const calculateTransaction = () => {
      const price = parseFloat(formData.priceHETH);
      const fee = price * conversionRate * 0.002; // 0.2% transaction fee
      setTransactionFee(fee);
    };

    calculateTransaction();
  }, [formData.priceHETH]);

  // Wallet balance
  const balanceInEth = BigInt(balance) / BigInt(1e60);
  const walletBalance = parseFloat(balanceInEth).toFixed(4);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          mt: 15,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          px: "auto",
          width: 0.8,
        }}
      >
        {/* Tabs for Send, Receive, and Transactions */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mx: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Send" {...a11yProps(0)} />
            <Tab label="Receive" {...a11yProps(1)} />
            <Tab label="Transactions" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          {/* Send Transaction Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography variant="h5">Balance: {walletBalance} HETH</Typography>
          </Box>
          <Box
            className="send-section"
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            mx={"auto"}
            width={0.3}
            mt={3}
          >
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {/* Form fields for sending transactions */}
                <TextField
                  type="text"
                  name="receiver"
                  label="Wallet ID"
                  variant="outlined"
                  placeholder=""
                  value={formData.receiver}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <TextField
                  type="number"
                  name="amount"
                  label="HETH Amount"
                  variant="outlined"
                  placeholder=""
                  value={formData.amount}
                  onChange={handleFormChange}
                  fullWidth
                  inputProps={{ min: 0 }}
                  style={{ marginBottom: "1rem" }}
                  InputLabelProps={{
                    shrink: formData.amount != null && formData.amount !== "",
                  }}
                  required
                />
                <TextField
                  type="number"
                  label="USD"
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0 }}
                  style={{ marginBottom: "1rem" }}
                  value={formData.priceUSD}
                  onChange={handleUSDChange}
                  InputLabelProps={{
                    shrink:
                      formData.priceUSD != null && formData.priceUSD !== "",
                  }}
                />
                {/* Display transaction fee */}
                <Typography>
                  &#x2022; Transaction Fee (0.2%): ${transactionFee.toFixed(3)}
                </Typography>
                {/* Button to send transaction */}
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </div>
            </form>
          </Box>
          {/* Transactions History */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography variant="h5">Transactions History</Typography>
          </Box>
          <table className="table table-dark table-bordered">
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Amount (HETH)</th>
                <th>Amount (USD)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.receiver}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.amount * conversionRate} </td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CustomTabPanel>
        {/* Receive Tab Panel */}
        <CustomTabPanel value={value} index={1}>
          <Box display={"flex"} flexDirection={"column"} px={"auto"}>
            <Box sx={{ mt: 3, mx: "auto" }}>
              <Typography variant="h5">
                My Wallet ID: {user.publicKey}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography variant="h5">
                Balance: {walletBalance} HETH
              </Typography>
            </Box>
            {/* Transactions History */}
            <Box sx={{ mt: 3, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Transactions History</Typography>
              </Box>
              <table className="table table-dark table-bordered">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Amount (HETH)</th>
                    <th>Amount (USD)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionReceiver.map((transaction) => (
                    <tr key={transaction.transactionId}>
                      <td>{transaction.sender}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.amount * conversionRate} </td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </CustomTabPanel>
        {/* Transactions Tab Panel */}
        <CustomTabPanel value={value} index={2}>
          <Box sx={{ mt: 3, mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography variant="h5">
                Balance: {walletBalance} HETH
              </Typography>
            </Box>
            <br />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Transactions History</Typography>
            </Box>
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Buy Date</th>
                  <th>Asset Name</th>
                  <th>Author</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionNFT.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.buy_date}</td>
                    <td>{transaction.asset_name}</td>
                    <td>{transaction.author}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CustomTabPanel>
      </Box>
    </Fade>
  );
}

export default WalletPage;
