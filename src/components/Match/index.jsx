import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';

import useMatchResult from 'hooks/database/useMatchResult';
import Counter from 'components/Counter';
import { getGoals } from 'helpers';

const Match = ({
  match,
  teams,
  serverProps,
}) => {
  const { results, setTeamResult } = useMatchResult({ ...serverProps, matchId: match.id });
  const teamA = {
    ...teams[0],
    goals: getGoals({ teamId: teams[0].id, results }),
  };
  const teamB = {
    ...teams[1],
    goals: getGoals({ teamId: teams[1].id, results }),
  };
  const handleSetResult = ({ id, newValue }) => {
    setTeamResult({ teamId: id, goals: newValue });
  };

  const renderDate = () => {
    const options = {
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    // TODO: Correct date
    const temp = new Date(match.date.seconds);

    return temp.toLocaleDateString('es-AR', options);
  };

  return (
    <Grid
      templateAreas={[
        `"date date"
        "teamA teamB"
        "teamAScore teamBScore"`,
        '"date teamA teamAScore teamBScore teamB"',
      ]}
      gridTemplateColumns={[
        '1fr 1fr',
        '100px repeat(4, 1fr)',
      ]}
    >
      <GridItem area="date">
        <Flex
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="md">{renderDate()}</Text>
        </Flex>
      </GridItem>
      <GridItem area="teamA">
        <Flex
          direction="column"
          alignItems="flex-end"
          justifyContent="center"
        >
          <ReactCountryFlag
            countryCode={teamA.id}
            svg
            style={{
              width: '2em',
              height: '2em',
              marginRight: '12px',
            }}
            title={teamA.label}
          />
          <Text fontSize="lg">{teamA.label}</Text>
        </Flex>
      </GridItem>
      <GridItem area="teamAScore">
        <Counter
          id={teamA.id}
          value={teamA.goals}
          setValue={handleSetResult}
        />
      </GridItem>
      <GridItem area="teamBScore">
        <Counter
          id={teamB.id}
          value={teamB.goals}
          setValue={handleSetResult}
        />
      </GridItem>
      <GridItem area="teamB">
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <ReactCountryFlag
            countryCode={teamB.id}
            svg
            style={{
              width: '2em',
              height: '2em',
              marginRight: '12px',
            }}
            title={teamB.label}
          />
          <Text fontSize="lg">{teamB.label}</Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Match;
