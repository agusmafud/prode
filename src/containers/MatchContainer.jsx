import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import useUserMatchScore from 'hooks/database/useUserMatchScore';
import useActualMatchScore from 'hooks/database/useActualMatchScore';
import useUserMatchPoints from 'hooks/database/useUserMatchPoints';
import { getMatchTeamsData, createTeamData } from 'helpers';

import Match from '../components/Match/Match';

const MatchContainer = ({
  index,
  match,
  teams,
  dbProps,
  actualResultsEditable,
  user,
  users,
  time,
}) => {
  const warningToast = useToast();
  const {
    teams: matchTeams,
    ...matchData
  } = match;
  const limitTime = 5 * 60; // can vote until 5 minutes match start
  const minutesLeft = Math.trunc((match.date.seconds - time - limitTime) / 60);
  const [scoreEnabled, setScoreEnabled] = useState((matchData.date.seconds - limitTime) > time);
  useEffect(() => {
    setScoreEnabled((matchData.date.seconds - limitTime) > time);
  }, [time, limitTime, matchData.date.seconds]);

  const matchTeamsData = getMatchTeamsData({ matchTeams, teams });
  const { userMatchScore, setTeamUserScore } = useUserMatchScore({ ...dbProps, matchId: match.id });
  const { actualMatchScore, setActualMatchScore } = useActualMatchScore({
    db: dbProps.db,
    matchId: match.id,
  });
  const userMatchPoints = useUserMatchPoints(
    { ...dbProps, matchId: match.id },
  );

  const teamA = createTeamData({ team: matchTeamsData[0], userMatchScore, actualMatchScore });
  const teamB = createTeamData({ team: matchTeamsData[1], userMatchScore, actualMatchScore });
  const actualScoreAvailable = (teamA?.actualGoals !== null && teamB?.actualGoals !== null);

  const handleSetResult = ({ id, newValue }) => {
    const userUnixTime = Math.floor(Date.now() / 1000);
    const shouldBlockScore = (matchData.date.seconds - limitTime + (2 * 60)) < userUnixTime;
    if (!actualResultsEditable && shouldBlockScore) {
      setScoreEnabled(false);
      warningToast({
        title: 'Mecanismo antiPedri activado',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const setResultFunction = actualResultsEditable
      ? setActualMatchScore
      : setTeamUserScore;
    setResultFunction({ teamId: id, goals: newValue });
  };

  return (
    <Match
      key={match.date + match.teams[0]}
      index={index}
      match={matchData}
      teamA={teamA}
      teamB={teamB}
      scoreEnabled={scoreEnabled}
      minutesLeft={minutesLeft}
      handleSetResult={handleSetResult}
      points={userMatchPoints}
      actualScoreAvailable={actualScoreAvailable}
      actualResultsEditable={actualResultsEditable}
      user={user}
      users={users}
      dbProps={dbProps}
    />
  );
};

export default MatchContainer;
