import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    // Container for the error page content
    <Box
      sx={{
        mt: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "67vh",
        gap: 5,
      }}
    >
      {/* Heading showing the error code */}
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      {/* Message indicating that the page doesn't exist */}
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      {/* Button to navigate back to the home page */}
      <Link to="/">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
}

export default ErrorPage;
