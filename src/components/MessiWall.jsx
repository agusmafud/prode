import React from 'react';
import {
  Grid, GridItem, Image, Box,
} from '@chakra-ui/react';

import messi1 from 'assets/messi1.gif';
import messi2 from 'assets/messi2.gif';
import messi3 from 'assets/messi3.gif';
import messi4 from 'assets/messi4.gif';
import messi5 from 'assets/messi5.gif';
import messi6 from 'assets/messi6.gif';
import messi7 from 'assets/messi7.gif';
import messi8 from 'assets/messi8.gif';
import messi9 from 'assets/messi9.gif';
import messi10 from 'assets/messi10.gif';
import messia from 'assets/messia.jpg';
import messib from 'assets/messib.jpg';
import messic from 'assets/messic.jpg';
import messid from 'assets/messid.jpg';
import messie from 'assets/messie.jpeg';
import messif from 'assets/messif.jpg';
import messig from 'assets/messig.jpg';

const MessiWall = ({ children }) => {
  const images = [
    { img: messi1, featured: false },
    { img: messia, featured: true },
    { img: messi2, featured: false },
    { img: messib, featured: true },
    { img: messic, featured: true },
    { img: messi3, featured: false },
    { img: messi4, featured: false },
    { img: messid, featured: true },
    { img: messi5, featured: false },
    { img: messie, featured: true },
    { img: messi6, featured: false },
    { img: messi7, featured: false },
    { img: messi8, featured: false },
    { img: messif, featured: true },
    { img: messig, featured: true },
    { img: messi9, featured: false },
    { img: messi10, featured: false },
    { img: messi1, featured: false },
    { img: messia, featured: true },
    { img: messi2, featured: false },
    { img: messib, featured: true },
    { img: messic, featured: true },
    { img: messi3, featured: false },
    { img: messi4, featured: false },
    { img: messid, featured: true },
    { img: messi5, featured: false },
    { img: messie, featured: true },
    { img: messi6, featured: false },
    { img: messi7, featured: false },
    { img: messi8, featured: false },
    { img: messif, featured: true },
    { img: messig, featured: true },
    { img: messi9, featured: false },
    { img: messi10, featured: false },
  ];

  const renderImage = (image, index) => (
    <GridItem key={image.img + index}>
      <Image
        width="100%"
        height="100%"
        objectFit="cover"
        opacity={0.8}
        src={image.img}
      />
    </GridItem>
  );

  return (
    <Box
      height="100vh"
      width="100%"
      background="green.100"
    >
      <Grid
        gridTemplateColumns={{
          base: 'repeat(auto-fit, minmax(125px, 1fr))',
          md: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
        overflowX="hidden"
        overflowY="hidden"
        maxHeight="100vh"
        width="100%"
      >
        {images.map((image, index) => renderImage(image, index))}
      </Grid>
      <Box
        width="auto"
        height="auto"
        padding="16px"
        position="absolute"
        top="40%"
        left="calc(50% - 100px)"
        background="rgba(0,0,0,0.6)"
        textAlign="center"
        borderRadius="8px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default MessiWall;
