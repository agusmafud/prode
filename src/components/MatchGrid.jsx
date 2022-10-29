import React from 'react';
import { Grid } from '@chakra-ui/react';

const MatchGrid = ({
  index,
  children,
}) => {
  const background = index % 2 === 0 ? 'gray.50' : 'white';

  return (
    <Grid
      templateAreas={{
        base:
        `"date date"
        "teamA teamB"
        "teamAScore teamBScore"`,
        lg: '"date teamA teamAScore teamBScore teamB"',
      }}
      gridTemplateColumns={{
        base: '1fr 1fr',
        lg: '110px 1fr 100px 100px 1fr',
      }}
      paddingX={2}
      paddingY={{ base: 4, lg: 6 }}
      gap={{ base: 1, lg: 8 }}
      background={background}
    >
      {children}
    </Grid>
  );
};

export default MatchGrid;
