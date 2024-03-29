import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, Menu, MenuItem, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import logo from "../assets/nifty-logo/svg/logo-no-background-white.svg";
import ProfilePic from "../assets/Capture.jpg";

function NavBar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const inputRef = useRef(null); // Ref for the input element

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery((prevSearchQuery) => inputValue);
  };

  const performSearch = () => {
    console.log("Performing search for:", searchQuery);

    // Encode the searchQuery to make sure it's properly formatted for URL
    const encodedSearchQuery = encodeURIComponent(searchQuery);

    // Redirect to another page with the searchQuery as a query parameter
    window.location.href = `/explore?search=${encodedSearchQuery}`;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter key
      performSearch();
    }
  };

  const NavigationBar = styled(Box)`
    height: 90px;
    width: 100vw;
    top: 0;
    z-index: 10;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    backdrop-filter: blur(15px);
    background-color: #101010a0;
    ${isMobile && `justify-content: space-between;`}
  `;

  const NavLink = styled(Link)`
    font-size: larger;
    text-decoration: none;
    color: #ffffff;
    &:hover {
      text-decoration: underline;
    }
    ${(props) =>
      props.isSelected &&
      `
        text-decoration: underline;
        `}
  `;

  const MenuFull = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 2.5vw;
    align-items: center;
    ${isMobile &&
    `
            gap: 1vw;
        `}
  `;

  const Hr = styled.hr`
    height: 70%;
    border: 1px solid white;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0)
    );
  `;

  const ProfilePicture = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
  `;

  const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 50px;
    input {
      font-size: 16px;
      border: none;
      outline: none;
      background-color: transparent;
    }
    input::placeholder {
      color: #3a3a3a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100vw;
    }
    border: 1px solid #3a3a3a;
    background-color: #101010;
    max-width: 40vw;
    width: 30vw;
  `;

  NavLink.propTypes = {
    isSelected: PropTypes.bool,
    to: PropTypes.string.isRequired,
  };

  useEffect(() => {
    // Focus the input element when searchQuery state changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  return (
    <NavigationBar>
      {!isMobile ? (
        <MenuFull>
          <Link to={"/home"}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <Hr />
          <li>
            <NavLink to={"/home"} isSelected={location.pathname === "/home"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/explore"}
              isSelected={location.pathname === "/explore"}
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/wallet"}
              isSelected={location.pathname === "/wallet"}
            >
              Wallet
            </NavLink>
          </li>
          <li>
            <NavLink to={"/owned"} isSelected={location.pathname === "/owned"}>
              Owned
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={"/sales"}
              isSelected={location.pathname === "/sales"}
            >
              Sales
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to={"/addproduct"}
              isSelected={location.pathname === "/addproduct"}
            >
              Add Product
            </NavLink>
          </li>
        </MenuFull>
      ) : (
        <MenuFull>
          <Button variant="text" color="primary" onClick={handleMenuOpen}>
            <MenuIcon />
          </Button>
          <Link to={"/home"}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </MenuFull>
      )}

      {!isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <SearchContainer>
            <SearchIcon />
            <input
              ref={inputRef} // Set the ref for the input element
              type="text"
              className="search-box"
              placeholder="Search for art"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
          </SearchContainer>
          <Link to={"/"} alt="Login Page" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary">
              Log Out
            </Button>
          </Link>

          <Link
            to={"/profile"}
            alt="Profile Page"
            style={{ textDecoration: "none" }}
          >
            <Button style={{ width: "60px", height: "60px" }}>
              <ProfilePicture src={ProfilePic} alt="avatar" />
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link
            to={"/profile"}
            alt="Profile Page"
            style={{ textDecoration: "none" }}
          >
            <Button style={{ width: "60px", height: "60px" }}>
              <ProfilePicture src={ProfilePic} alt="avatar" />
            </Button>
          </Link>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  color: "red",
                  width: "100%",
                  maxWidth: "100%",
                  left: "0px",
                  right: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            }}
            marginThreshold={0}
          >
            <SearchContainer>
              <SearchIcon />
              <form onSubmit={performSearch}>
                <input
                  ref={inputRef} // Set the ref for the input element
                  type="text"
                  className="search-box"
                  placeholder="Search for art"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </form>
            </SearchContainer>
            <MenuItem onClick={handleMenuClose}>
              <NavLink to={"/home"} isSelected={location.pathname === "/home"}>
                Home
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink
                to={"/explore"}
                isSelected={location.pathname === "/explore"}
              >
                Explore
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink
                to={"/wallet"}
                isSelected={location.pathname === "/wallet"}
              >
                Wallet
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink
                to={"/owned"}
                isSelected={location.pathname === "/owned"}
              >
                Owned
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink
                to={"/sales"}
                isSelected={location.pathname === "/sales"}
              >
                Sales
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NavLink
                to={"/addproduct"}
                isSelected={location.pathname === "/addproduct"}
              >
                Add Product
              </NavLink>
            </MenuItem>
            <Link to={"/"} alt="Login Page" style={{ textDecoration: "none" }}>
              <Box display={"flex"} justifyContent={"center"}>
                <Button variant="outlined" color="primary">
                  Log Out
                </Button>
              </Box>
            </Link>
          </Menu>
        </Box>
      )}
    </NavigationBar>
  );
}

export default NavBar;
