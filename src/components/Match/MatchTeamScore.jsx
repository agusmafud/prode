import React from 'react';
import {
  Text,
} from '@chakra-ui/react';

import Counter from 'components/Counter';
import { getResultColor } from 'helpers';

const MatchTeamScore = ({
  team,
  scoreEnabled,
  handleSetResult,
  points,
  actualResultsEditable,
}) => {
  const resultColor = getResultColor(points);
  const goals = actualResultsEditable
    ? team?.actualGoals ?? 0
    : team.goals;
  const showCounter = scoreEnabled || actualResultsEditable;

  return (
    showCounter
      ? (
        <Counter
          id={team.id}
          value={goals}
          setValue={handleSetResult}
        />

      ) : (
        <Text
          fontSize="5xl"
          fontWeight={600}
          textAlign="center"
          textShadow="0 0 2px #333"
          color={resultColor}
        >
          {goals}
        </Text>
      )
  );
};

export default MatchTeamScore;
