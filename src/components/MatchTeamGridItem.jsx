import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Flex,
  GridItem,
  Text,
} from '@chakra-ui/react';

const MatchTeamGridItem = ({
  gridArea,
  team,
  teamSide,
}) => (
  <GridItem area={gridArea}>
    <Flex
      justifyContent={{
        base: 'center',
        lg: teamSide === 'left'
          ? 'flex-end'
          : 'flex-start',
      }}
      height="100%"
    >
      <Flex
        direction="column"
        alignItems={{
          base: 'center',
          lg: teamSide === 'left'
            ? 'flex-end'
            : 'flex-start',
        }}
        justifyContent="center"
      >
        <ReactCountryFlag
          countryCode={team.id}
          svg
          style={{
            width: '50px',
            height: 'auto',
            border: '1px solid #aaa',
          }}
          title={team.label}
        />
        <Text
          fontSize="lg"
          fontWeight="600"
          paddingTop={1}
        >
          {team.label}
        </Text>
      </Flex>
    </Flex>
  </GridItem>
);

export default MatchTeamGridItem;
