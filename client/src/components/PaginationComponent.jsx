/* eslint-disable react/prop-types */ // Disable eslint rule for prop-types since we're not using prop types checking here
import { Box, Pagination } from "@mui/material";

// PaginationComponent function component
function PaginationComponent({ cards, setCurrentPage, itemsPerPage }) {
  // Calculate the total number of pages needed to display all the items
  const totalPages = Math.ceil((cards.length * 1.0) / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // Set the new current page using setCurrentPage function
    console.log(event, newPage); // Log event and new page number to the console
  };

  // Return JSX for PaginationComponent
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        mt: 5,
      }}
    >
      <Pagination
        defaultPage={1} // Set the default page to 1
        count={totalPages} // Total number of pages for Pagination component
        onChange={handlePageChange} // Handle page change event with handlePageChange function
      />
    </Box>
  );
}

export default PaginationComponent; // Export PaginationComponent
