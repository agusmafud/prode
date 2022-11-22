import React from 'react';

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
}) => {
  const {
    teams: matchTeams,
    ...matchData
  } = match;
  const matchTeamsData = getMatchTeamsData({ matchTeams, teams });

  const actualTime = dbProps.time;
  const limitTime = 5 * 60; // can vote until 5 minutes match start
  const scoreEnabled = matchData.date.seconds > (actualTime + limitTime);
  const minutesLeft = Math.trunc((match.date.seconds - actualTime - limitTime) / 60);

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
