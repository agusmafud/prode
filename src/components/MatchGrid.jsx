import React from 'react';
import { Grid } from '@chakra-ui/react';

const MatchGrid = ({
  background,
  children,
}) => (
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
      lg: '150px 1fr 100px 100px 1fr',
    }}
    width="100%"
    paddingX={2}
    paddingY={{ base: 4, lg: 6 }}
    gap={{ base: 1, lg: 8 }}
    background={background}
  >
    {children}
  </Grid>
);

export default MatchGrid;
