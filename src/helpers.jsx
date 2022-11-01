import React from 'react';

export const getTeamLabel = ({
  teamCode,
  teams,
}) => {
  const result = teams.find((team) => team.id === teamCode);

  return result.label;
};

export const getGroupTeamsData = ({ groupTeams, teams }) => {
  const groupTeamsData = groupTeams.map((groupTeam) => ({
    id: groupTeam,
    label: getTeamLabel({ teamCode: groupTeam, teams }),
  }));

  return groupTeamsData;
};

export const getGroupMatchesData = ({ groupMatches, matches }) => {
  const groupMatchesData = groupMatches.map((groupMatch) => ({
    ...matches.find((match) => match.id === groupMatch),
  }));

  return groupMatchesData;
};

export const getMatchTeamsData = ({ matchTeams, teams }) => {
  const matchTeamsData = matchTeams.map((matchTeam) => ({
    ...teams.find((team) => team.id === matchTeam),
  }));

  return matchTeamsData;
};

export const getGoals = ({ teamId, results }) => {
  const teamResult = results?.find(
    ((teamScore) => teamScore.id === teamId),
  );

  return teamResult?.goals ?? 0;
};

export const renderUnixTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const dayNames = ['dom', 'lun', 'mar', 'miér', 'jue', 'vie', 'sáb'];
  const dayName = dayNames[date.getDay()];
  const dayNumber = date.getDate();
  const monthNames = ['ene', 'febr', 'marzo', 'abr', 'mayo', 'jun', 'jul', 'ag', 'sept', 'oct', 'nov', 'dic'];
  const month = monthNames[date.getMonth()];
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const renderedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
  const renderedTime = (
    <span>
      {`${dayName} ${dayNumber}-${month} `}
      {`${hour}:${renderedMinutes}hs`}
    </span>
  );

  return renderedTime;
};

const verifyAreResultsValid = ({ userResults, actualResults }) => {
  if (userResults?.length !== 2 || actualResults?.length !== 2) return false;
  if (!actualResults.find((res) => res.id === userResults[0].id)) return false;
  if (!actualResults.find((res) => res.id === userResults[1].id)) return false;

  return true;
};

const createFullResults = ({ userResults, actualResults }) => {
  // TODO: HACER QUE SI EL USUARIO NO PUSO NADA, EL DEFAULT SEA 0 - 0
  const teamAFullResults = {
    id: userResults[0].id,
    userResults: Number(userResults[0].goals),
    actualResults: Number(actualResults.find((res) => res.id === userResults[0].id).goals),
  };
  const teamBFullResults = {
    id: userResults[1].id,
    userResults: Number(userResults[1].goals),
    actualResults: Number(actualResults.find((res) => res.id === userResults[1].id).goals),
  };

  return { teamAFullResults, teamBFullResults };
};

const createMatchScore = ({ teamA, teamB }) => {
  if (
    (teamA.userResults === teamB.userResults && teamA.actualResults === teamB.actualResults)
    || (teamA.userResults > teamB.userResults && teamA.actualResults > teamB.actualResults)
    || (teamA.userResults < teamB.userResults && teamA.actualResults < teamB.actualResults)
  ) return ({ state: true, points: 3 });
  return ({ state: false, points: 0 });
};

const createExactScore = ({ teamA, teamB }) => {
  if (teamA.userResults === teamA.actualResults && teamB.userResults === teamB.actualResults) {
    return ({ state: true, points: 1 });
  }
  return ({ state: false, points: 0 });
};

export const createScore = ({ userResults, actualResults }) => {
  const areResultsValid = verifyAreResultsValid({ userResults, actualResults });
  if (!areResultsValid) {
    return ({
      match: { state: false, points: 0 },
      exact: { state: false, points: 0 },
    });
  }

  const { teamAFullResults, teamBFullResults } = createFullResults({ userResults, actualResults });

  const matchScore = createMatchScore({ teamA: teamAFullResults, teamB: teamBFullResults });
  const exactScore = createExactScore({ teamA: teamAFullResults, teamB: teamBFullResults });

  return {
    match: matchScore,
    exact: exactScore,
  };
};
