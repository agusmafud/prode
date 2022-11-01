import React from 'react';
import {
  Badge,
  Grid,
  GridItem,
  VStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';

import useUserMatchResult from 'hooks/database/useUserMatchResult';
import useActualMatchResult from 'hooks/database/useActualMatchResult';
import Counter from 'components/Counter';
import MatchGrid from 'components/MatchGrid';
import MatchTeamGridItem from 'components/MatchTeamGridItem';
import { createScore, getGoals, renderUnixTime } from 'helpers';

const Match = ({
  index,
  match,
  teams,
  scoreEnabled,
  minutesLeft,
  dbProps,
}) => {
  const { userResults, setTeamUserResult } = useUserMatchResult({ ...dbProps, matchId: match.id });
  const actualResults = useActualMatchResult({
    db: dbProps.db,
    matchId: match.id,
  });
  // eslint-disable-next-line no-unused-vars
  const score = createScore({ userResults, actualResults });

  const background = index % 2 === 0 ? 'gray.50' : 'white';
  const teamA = {
    ...teams[0],
    goals: getGoals({ teamId: teams[0].id, results: userResults }),
    // TODO: Add logic
    actualGoals: null,
  };
  const teamB = {
    ...teams[1],
    goals: getGoals({ teamId: teams[1].id, results: userResults }),
    // TODO: Add logic
    actualGoals: null,
  };
  const handleSetResult = ({ id, newValue }) => {
    setTeamUserResult({ teamId: id, goals: newValue });
  };
  const timeLeftString = minutesLeft === 0
    ? 'últimos segundos'
    : `${minutesLeft} ${minutesLeft === 1 ? 'minuto restante' : 'minutos restantes'}`;

  return (
    <VStack gap="0">
      <MatchGrid background={background}>
        <GridItem
          area="date"
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingBottom={{ base: 4, lg: 0 }}
        >
          <Stack
            direction="column"
            alignItems="center"
          >
            <Tag
              size="md"
              textAlign="center"
              fontWeight="normal"
              padding={3}
              width="auto"
            >
              {renderUnixTime(match.date.seconds)}
            </Tag>
            <Badge
              variant="subtle"
              width="min-content"
              colorScheme={scoreEnabled ? 'green' : 'red'}
            >
              {scoreEnabled
                ? 'VOTO ABIERTO'
                : 'VOTO CERRADO'}
            </Badge>
            {scoreEnabled && minutesLeft < 60 && (
              <Badge
                variant="solid"
                width="min-content"
                colorScheme="red"
              >
                {timeLeftString}
              </Badge>
            )}
          </Stack>
        </GridItem>
        <MatchTeamGridItem
          gridArea="teamA"
          team={teamA}
          teamSide="left"
        />
        <GridItem
          area="teamAScore"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {scoreEnabled
            ? (
              <Counter
                id={teamA.id}
                value={teamA.goals}
                setValue={handleSetResult}
              />

            ) : (
              <Text
                fontSize="5xl"
                fontWeight={600}
                textAlign="center"
              >
                {teamA.goals}
              </Text>
            )}
        </GridItem>
        <GridItem
          area="teamBScore"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {scoreEnabled
            ? (
              <Counter
                id={teamB.id}
                value={teamB.goals}
                setValue={handleSetResult}
              />

            ) : (
              <Text
                fontSize="5xl"
                fontWeight={600}
                textAlign="center"
              >
                {teamB.goals}
              </Text>
            )}
        </GridItem>
        <MatchTeamGridItem
          gridArea="teamB"
          team={teamB}
          teamSide="right"
        />
      </MatchGrid>
      {false && (
        <Grid
          paddingX={2}
          paddingY={{ base: 4, lg: 4 }}
          gap={{ base: 1, lg: 8 }}
          width="100%"
          marginTop="0 !important"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          background="orange.50"
        >
          hola
        </Grid>
      )}
    </VStack>
  );
};

export default Match;
