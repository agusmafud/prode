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
