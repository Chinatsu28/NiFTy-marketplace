import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import BackgroundImage1 from '../assets/bg/introduction.png';
import BackgroundImage2 from '../assets/bg/ethereum.png';
import BackgroundImage3 from '../assets/bg/wallet.png';
import { Box } from '@mui/material';

function ImageCarousel() {
  // Styled components for custom styling
  const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
  `;

  const CustomCarousel = styled.div`
    // Custom styles for carousel and caption
    .carousel-inner {
      height: 100% !important;
    }
    .carousel-caption {
      // Custom positioning and styling for captions
      top: 5vh;
      padding-top: auto;
      display: flex;
      text-align: left;
      flex-wrap: wrap;
      align-content: center;
      right: 40vw;
      bottom: 30vh;
    }
    h1 {
      // Custom styles for heading
      margin-top: 5vh;
      font-weight: 900;
      font-size: 3vw;
    }
    p {
      // Custom styles for paragraph
      margin-top: 5px;
      font-size: 1.25vw;
    }
    .button {
      // Custom styles for buttons
      font-size: 1.25vw;
      padding: 0.75vw 1vw;
      margin-right: 1vw;
      margin-top: 3px;
    }
    #exr {
      // Custom styles for specific element
      background-color: black;
      color: white;
      border: 1px solid black;
      border-radius: 1vw;
      padding: 0.75vw 1vw;
    }
  `;

  return (
    <CustomCarousel>
      {/* Carousel component */}
      <Carousel style={{ maxWidth: '80vw', height: 'auto', position: 'relative' }}>
        {/* First slide */}
        <Carousel.Item interval={2000} style={{ maxWidth: '80vw', height: 'auto' }}>
          <Image src={BackgroundImage1} alt="First slide" />
          <Carousel.Caption>
            {/* Link to explore */}
            <Link to="/explore">
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Second slide */}
        <Carousel.Item interval={2000} style={{ height: '100%' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Image src={BackgroundImage2} alt="Second slide" />
          </Box>
        </Carousel.Item>
        {/* Third slide */}
        <Carousel.Item interval={2000} style={{ width: '100%', height: '100%' }}>
          <Image src={BackgroundImage3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </CustomCarousel>
  );
}

export default ImageCarousel;
