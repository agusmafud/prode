import React from 'react';
import {
  GridItem,
  Tag,
} from '@chakra-ui/react';

import useMatchResult from 'hooks/database/useMatchResult';
import Counter from 'components/Counter';
import MatchGrid from 'components/MatchGrid';
import MatchTeamGridItem from 'components/MatchTeamGridItem';
import { getGoals, renderUnixTime } from 'helpers';

const Match = ({
  index,
  match,
  teams,
  dbProps,
}) => {
  const { results, setTeamResult } = useMatchResult({ ...dbProps, matchId: match.id });
  const teamA = { ...teams[0], goals: getGoals({ teamId: teams[0].id, results }) };
  const teamB = { ...teams[1], goals: getGoals({ teamId: teams[1].id, results }) };
  const handleSetResult = ({ id, newValue }) => {
    setTeamResult({ teamId: id, goals: newValue });
  };

  return (
    <MatchGrid index={index}>
      <GridItem
        area="date"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom={{ base: 4, lg: 0 }}
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
      >
        <Counter
          id={teamA.id}
          value={teamA.goals}
          setValue={handleSetResult}
        />
      </GridItem>
      <GridItem
        area="teamBScore"
        display="flex"
        justifyContent="center"
      >
        <Counter
          id={teamB.id}
          value={teamB.goals}
          setValue={handleSetResult}
        />
      </GridItem>
      <MatchTeamGridItem
        gridArea="teamB"
        team={teamB}
        teamSide="right"
      />
    </MatchGrid>
  );
};

export default Match;
