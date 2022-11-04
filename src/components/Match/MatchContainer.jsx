import React from 'react';

import useUserMatchScore from 'hooks/database/useUserMatchScore';
import useActualMatchScore from 'hooks/database/useActualMatchScore';
import { getMatchTeamsData, createTeamData, createPoints } from 'helpers';

import Match from './Match';

const MatchContainer = ({
  index,
  match,
  teams,
  dbProps,
}) => {
  const {
    teams: matchTeams,
    ...matchData
  } = match;
  const matchTeamsData = getMatchTeamsData({ matchTeams, teams });

  const actualTime = dbProps.time;
  const limitTime = 5 * 60;
  const scoreEnabled = matchData.date.seconds > (actualTime + limitTime);
  const minutesLeft = Math.trunc((match.date.seconds - actualTime - limitTime) / 60);

  const { userMatchScore, setTeamUserScore } = useUserMatchScore({ ...dbProps, matchId: match.id });
  const { actualMatchScore } = useActualMatchScore({ db: dbProps.db, matchId: match.id });

  const teamA = createTeamData({ team: matchTeamsData[0], userMatchScore, actualMatchScore });
  const teamB = createTeamData({ team: matchTeamsData[1], userMatchScore, actualMatchScore });
  const points = createPoints({ teamA, teamB });
  const actualScoreAvailable = (teamA?.actualGoals !== null && teamB?.actualGoals !== null);

  const handleSetResult = ({ id, newValue }) => setTeamUserScore({ teamId: id, goals: newValue });

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
      points={points}
      actualScoreAvailable={actualScoreAvailable}
    />
  );
};

export default MatchContainer;
