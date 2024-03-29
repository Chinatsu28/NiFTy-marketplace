import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardItem = ({ index, item }) => {
  const [isHovering, setIsHovering] = useState(false);

  if (!item) {
    return null; // If item is null or undefined, render nothing
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          top: isHovering ? "5%" : "1%",
          left: "1%",
          position: "absolute",
          width: "98%",
          height: "98%",
          background: "linear-gradient(170deg, transparent, #ffffff)",
          zIndex: 1,
          transformOrigin: "top left",
          transition: "0.3s ease-in-out",
          rotate: isHovering ? "2deg" : "0",
          borderRadius: "4px",
        }}
      />
      <Card
        onMouseOver={() => {
          setIsHovering(true);
        }}
        onMouseOut={() => {
          setIsHovering(false);
        }}
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          zIndex: 2,
        }}
      >
        <Link
          to={`/product?${Object.entries(item)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .concat([`index=${index}`, `assetId=${item.assetId}`])
            .join("&")}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="div"
            sx={{
              pt: "100%",
            }}
            // image="https://cos30049.s3.eu-west-1.amazonaws.com/images1.jpeg"
            image={item && item.imageURL}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2">
              {item && item.name}
            </Typography>
            <Typography>{item && item.username}</Typography>
            <Typography
              variant="h7"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Prices (HETH): {item && item.amount}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <Link
            to={`/product?${Object.entries(item)
              .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
              .concat([`index=${index}`, `assetID=${item.assetID}`])
              .join("&")}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" style={{ borderRadius: "2vw" }}>
              View
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

CardItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    price: PropTypes.number,
    imageURL: PropTypes.string,
    assetId: PropTypes.number,
    amount: PropTypes.number,
    // Add more propTypes as needed based on your 'item' structure
  }),
};

export default CardItem;
