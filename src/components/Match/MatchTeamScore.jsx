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
}) => {
  const resultColor = getResultColor(points);

  return (
    scoreEnabled
      ? (
        <Counter
          id={team.id}
          value={team.goals}
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
          {team.goals}
        </Text>
      )
  );
};

export default MatchTeamScore;
