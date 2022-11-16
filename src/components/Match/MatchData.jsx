import React from 'react';
import {
  Badge,
  Stack,
  Tag,
} from '@chakra-ui/react';

import { renderUnixTime, getResultColor, getResultText } from 'helpers';

const MatchData = ({
  match,
  scoreEnabled,
  minutesLeft,
  points,
  actualScoreAvailable,
  actualResultsEditable,
}) => {
  const showPendingMessage = !scoreEnabled && !actualScoreAvailable;
  const showTimeLeft = scoreEnabled && minutesLeft < 60;
  const showPoints = !scoreEnabled && actualScoreAvailable && !actualResultsEditable;

  const timeLeftText = minutesLeft === 0
    ? 'últimos segundos'
    : `${minutesLeft} ${minutesLeft === 1 ? 'minuto restante' : 'minutos restantes'}`;
  const resultColor = getResultColor(points);
  const resultText = getResultText(points);
  const pointsText = `Sumaste ${points.exact.points + points.match.points} puntos`;

  return (
    <Stack
      direction="column"
      alignItems="center"
    >
      <Tag
        size={scoreEnabled ? 'md' : 'sm'}
        textAlign="center"
        fontWeight="normal"
        padding={3}
        width="auto"
      >
        {renderUnixTime(match.date.seconds)}
      </Tag>
      {scoreEnabled && (
        <Badge
          variant="subtle"
          width="min-content"
          colorScheme="green"
        >
          VOTO ABIERTO
        </Badge>
      )}
      {showTimeLeft && (
        <Badge
          variant="solid"
          width="min-content"
          colorScheme="red"
        >
          {timeLeftText}
        </Badge>
      )}
      {showPendingMessage && (
        <Badge
          variant="subtle"
          width="min-content"
          colorScheme="red"
        >
          VOTO CERRADO
        </Badge>
      )}
      {actualResultsEditable && (
        <Badge
          variant="solid"
          width="min-content"
          colorScheme="red"
        >
          EDITANDO
        </Badge>
      )}
      {showPoints && (
        <>
          <Badge
            fontSize="lg"
            variant="solid"
            width="min-content"
            colorScheme={resultColor}
          >
            {resultText}
          </Badge>
          <Badge
            variant="subtle"
            width="min-content"
            colorScheme={resultColor}
          >
            {pointsText}
          </Badge>
        </>
      )}
    </Stack>
  );
};

export default MatchData;
