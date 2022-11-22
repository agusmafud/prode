import React from 'react';
import {
  Code,
  Button,
  GridItem,
  VStack,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';

import setMatchPoints from 'hooks/database/setMatchPoints';
import setUsersMatchScore from 'hooks/database/setUsersMatchScore';
// import { transformUsers } from 'helpers';

import MatchGrid from './MatchGrid';
import MatchData from './MatchData';
import MatchTeamData from './MatchTeamData';
import MatchTeamScore from './MatchTeamScore';

const Match = ({
  index,
  match,
  teamA,
  teamB,
  scoreEnabled,
  minutesLeft,
  handleSetResult,
  points,
  actualScoreAvailable,
  actualResultsEditable,
  users,
  dbProps,
}) => {
  const getBackground = () => {
    if (actualResultsEditable) {
      return index % 2 === 0 ? 'red.200' : 'red.100';
    }
    return index % 2 === 0 ? 'gray.50' : 'white';
  };
  const background = getBackground();
  const showActualScore = (
    !scoreEnabled && actualScoreAvailable && !points.exact.state && !actualResultsEditable);
  const showExtraData = actualResultsEditable || showActualScore || !scoreEnabled;

  // const orderedUsers = transformUsers(users);

  return (
    <VStack gap="0">
      <MatchGrid
        background={background}
        extraData={showExtraData}
      >
        <GridItem
          area="date"
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingBottom={{ base: 4, lg: 0 }}
        >
          <MatchData
            match={match}
            scoreEnabled={scoreEnabled}
            minutesLeft={minutesLeft}
            points={points}
            actualScoreAvailable={actualScoreAvailable}
            actualResultsEditable={actualResultsEditable}
          />
        </GridItem>
        <GridItem area="teamA">
          <MatchTeamData
            area="teamA"
            team={teamA}
            teamSide="left"
          />
        </GridItem>
        <GridItem
          area="teamAScore"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MatchTeamScore
            team={teamA}
            scoreEnabled={scoreEnabled}
            handleSetResult={handleSetResult}
            points={points}
            actualResultsEditable={actualResultsEditable}
          />
        </GridItem>
        <GridItem
          area="separator"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="2xl">
            -
          </Text>
        </GridItem>
        <GridItem
          area="teamBScore"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MatchTeamScore
            team={teamB}
            scoreEnabled={scoreEnabled}
            handleSetResult={handleSetResult}
            points={points}
            actualResultsEditable={actualResultsEditable}
          />
        </GridItem>
        <GridItem area="teamB">
          <MatchTeamData
            team={teamB}
            teamSide="right"
          />
        </GridItem>
        <GridItem area="teamB">
          <MatchTeamData
            team={teamB}
            teamSide="right"
          />
        </GridItem>
        {showExtraData && (
          <GridItem
            area="extraData"
            display="flex"
            justifyContent="center"
          >
            <Flex direction="column" alignItems="center">
              {actualResultsEditable && (
                <>
                  <Button
                    colorScheme="red"
                    size="xs"
                    letterSpacing={1.3}
                    border="2px solid white"
                    marginTop={{ base: 4, md: 0 }}
                    marginBottom={{ base: 2, md: 6 }}
                    onClick={() => setUsersMatchScore({
                      db: dbProps.db,
                      users,
                      matchId: match.id,
                      teamA,
                      teamB,
                    })}
                  >
                    GOLES
                  </Button>
                  <Button
                    colorScheme="whatsapp"
                    size="md"
                    letterSpacing={1.3}
                    border="2px solid white"
                    marginTop={{ base: 4, md: 0 }}
                    marginBottom={{ base: 2, md: 6 }}
                    onClick={() => setMatchPoints({
                      db: dbProps.db,
                      users,
                      matchId: match.id,
                      teamA,
                      teamB,
                    })}
                  >
                    CREAR PUNTAJES
                  </Button>
                </>
              )}
              {showActualScore && (
                <Box
                  marginTop={{ base: 0, md: -5 }}
                  marginBottom={{ base: 2, md: 4 }}
                >
                  <Code colorScheme="red">
                    {`Resultado: ${teamA.label}: ${teamA.actualGoals} - ${teamB.label}: ${teamB.actualGoals}`}
                  </Code>
                </Box>
              )}
              {!scoreEnabled && false && (
                <Button
                  onClick={() => {}}
                  variant="outline"
                  size="xs"
                  marginBottom={{ base: 2, md: 4 }}
                  colorScheme="orange"
                >
                  Ver qué votó la gilada
                </Button>
              )}
            </Flex>
          </GridItem>
        )}
      </MatchGrid>
    </VStack>
  );
};

export default Match;
