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

export const getGoals = ({
  teamId,
  score,
  defaultToZero = false,
}) => {
  const defaultValue = defaultToZero ? 0 : null;
  const teamResult = score?.find(
    ((teamScore) => teamScore.id === teamId),
  );
  const goals = teamResult?.goals !== undefined
    ? Number(teamResult?.goals)
    : defaultValue;

  return goals;
};

export const createTeamData = ({ team, userMatchScore, actualMatchScore }) => ({
  ...team,
  goals: getGoals({
    teamId: team.id,
    score: userMatchScore,
    defaultToZero: true,
  }),
  actualGoals: getGoals({
    teamId: team.id,
    score: actualMatchScore,
  }),
});

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

const createMatchPoints = ({ teamA, teamB }) => {
  if (
    (teamA.goals === teamB.goals && teamA.actualGoals === teamB.actualGoals)
    || (teamA.goals > teamB.goals && teamA.actualGoals > teamB.actualGoals)
    || (teamA.goals < teamB.goals && teamA.actualGoals < teamB.actualGoals)
  ) return ({ state: true, points: 3 });
  return ({ state: false, points: 0 });
};

const createExactPoints = ({ teamA, teamB }) => {
  if (teamA.goals === teamA.actualGoals && teamB.goals === teamB.actualGoals) {
    return ({ state: true, points: 1 });
  }
  return ({ state: false, points: 0 });
};

export const createPoints = ({ teamA, teamB }) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const actualResultsAvailable = !!(teamA?.actualGoals !== null && teamB?.actualGoals !== null);

  if (!actualResultsAvailable) {
    return ({
      points: {
        match: { state: false, points: 0 },
        exact: { state: false, points: 0 },
      },
      totalPoints: 0,
    });
  }

  const matchPoints = createMatchPoints({ teamA, teamB });
  const exactPoints = createExactPoints({ teamA, teamB });

  return {
    points: {
      match: matchPoints,
      exact: exactPoints,
    },
    totalPoints: matchPoints.points + exactPoints.points,
  };
};

const INCORRECT = 'INCORRECT';
const OK = 'OK';
const PERFECT = 'PERFECT';
const resultsData = {
  [INCORRECT]: {
    color: 'red',
    text: 'INCORRECTO',
  },
  [OK]: {
    color: 'green',
    text: 'CORRECTO',
  },
  [PERFECT]: {
    color: 'orange',
    text: 'PERFECTO',
  },
};
export const getResultData = (points) => {
  if (points?.exact?.state) return resultsData[PERFECT];
  if (points?.match?.state) return resultsData[OK];
  return resultsData[INCORRECT];
};
export const getResultColor = (points) => {
  const resultData = getResultData(points);

  return resultData.color;
};
export const getResultText = (points) => {
  const resultData = getResultData(points);

  return resultData.text;
};
