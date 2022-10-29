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
  const teamResult = results.find(
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
