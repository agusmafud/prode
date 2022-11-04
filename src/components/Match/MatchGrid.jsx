import React from 'react';
import { Grid } from '@chakra-ui/react';

const MatchGrid = ({
  background,
  children,
  extraData,
}) => (
  <Grid
    templateAreas={{
      base:
        `"date date date"
        "teamA . teamB"
        "teamAScore separator teamBScore"
        "extraData extraData extraData"`,
      lg:
        `"date teamA teamAScore separator teamBScore teamB"
        ". extraData extraData extraData extraData extraData"`,
    }}
    gridTemplateColumns={{
      base: '1fr 15px 1fr',
      lg: '150px 1fr 100px 15px 100px 1fr',
    }}
    width="100%"
    paddingTop={{ base: 4, lg: 6 }}
    paddingBottom={{
      base: 4,
      lg: extraData ? 0 : 4,
    }}
    paddingRight={extraData ? 0 : 2}
    paddingLeft={2}
    gap={{ base: 1, lg: 4 }}
    background={background}
  >
    {children}
  </Grid>
);

export default MatchGrid;
