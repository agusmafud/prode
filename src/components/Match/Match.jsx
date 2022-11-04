import React from 'react';
import {
  GridItem,
  VStack,
  Text,
} from '@chakra-ui/react';

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
}) => {
  const background = index % 2 === 0 ? 'gray.50' : 'white';
  const showExtraData = actualScoreAvailable && !(points.exact.state);

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
          />
        </GridItem>
        <GridItem
          area="separator"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
          >
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
          >
            {`El resultado fue ${teamA.label}: ${teamA.actualGoals} - ${teamB.label}: ${teamB.actualGoals}`}
          </GridItem>
        )}
      </MatchGrid>
    </VStack>
  );
};

export default Match;
