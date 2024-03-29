import styled from "styled-components";
import { useState } from "react";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

// Footer component
function Footer() {
  // Check if the screen size is mobile
  const isMobile = useMediaQuery("(max-width:900px)");

  // Styled component for the footer
  const Footer = styled(Box)`
    margin-top: 40vh;
    height: 10vh;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #1a1a1a;
    ${isMobile &&
    `
            flex-direction: column;
        `}
  `;

  // Function to get the current date
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    return ` ${year}`;
  }

  // State for storing the current date
  const [currentDate] = useState(getDate());

  return (
    <Footer>
      {/* Display copyright and current date */}©{currentDate} NiFTy, Inc. All
      rights reserved.
      {/* Divider */}
      <Divider />
      {/* Links for terms, policy, and contact */}
      <Box
        sx={{
          width: 0.15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Link to="*">Terms</Link>·<Link to="*">Policy</Link>·
        <Link to="*">Contact </Link>
      </Box>
    </Footer>
  );
}

export default Footer;
