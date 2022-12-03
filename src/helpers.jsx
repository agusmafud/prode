import React from 'react';
import { SmallCloseIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';

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

export const getDateFromUnixTime = (unixTime) => new Date(unixTime * 1000);
export const getDayName = (date) => {
  const dayNames = ['dom', 'lun', 'mar', 'miér', 'jue', 'vie', 'sáb'];

  return dayNames[date.getDay()];
};
export const getDayNumber = (date) => date.getDate();
export const getMonth = (date) => {
  const monthNames = ['ene', 'febr', 'marzo', 'abr', 'mayo', 'jun', 'jul', 'ag', 'sept', 'oct', 'nov', 'dic'];

  return monthNames[date.getMonth()];
};
export const getMonthLongName = (date) => {
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return monthNames[date.getMonth()];
};
export const getHours = (date) => date.getHours();
export const getMinutes = (date) => date.getMinutes();

export const renderUnixTime = (unixTime) => {
  const date = getDateFromUnixTime(unixTime);
  const dayName = getDayName(date);
  const dayNumber = getDayNumber(date);
  const month = getMonth(date);
  const hour = getHours(date);
  const minutes = getMinutes(date);
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
  ) return ({ state: true, points: 4 });
  return ({ state: false, points: 0 });
};

const createExactPoints = ({ teamA, teamB }) => {
  if (teamA.goals === teamA.actualGoals && teamB.goals === teamB.actualGoals) {
    return ({ state: true, points: 2 });
  }
  return ({ state: false, points: 0 });
};

export const createPoints = ({ teamA, teamB }) => {
  const teamAWithActualResults = {
    goals: teamA.goals ?? 0,
    actualGoals: teamA.actualGoals ?? 0,
  };
  const teamBWithActualResults = {
    goals: teamB.goals ?? 0,
    actualGoals: teamB.actualGoals ?? 0,
  };

  const matchPoints = createMatchPoints({
    teamA: teamAWithActualResults,
    teamB: teamBWithActualResults,
  });
  const exactPoints = createExactPoints({
    teamA: teamAWithActualResults,
    teamB: teamBWithActualResults,
  });

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
    Icon: SmallCloseIcon,
  },
  [OK]: {
    color: 'green',
    text: 'CORRECTO',
    Icon: CheckIcon,
  },
  [PERFECT]: {
    color: 'orange',
    text: 'PERFECTO',
    Icon: StarIcon,
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

const addOrderedToMatches = ({ matches, match }) => {
  const newMatches = [...matches, match];
  const orderedMatches = newMatches.sort((a, b) => {
    if (a.date.seconds < b.date.seconds) return -1;
    return 1;
  });

  return orderedMatches;
};

export const getDateGroups = (matches) => {
  const dateGroups = matches.reduce((acc, match) => {
    const date = getDateFromUnixTime(match.date);
    const dayName = getDayName(date);
    const dayNumber = getDayNumber(date);
    const month = getMonthLongName(date);
    const groupIndex = acc.findIndex((e) => e.id === dayNumber + month);
    const groupAlreadyCreated = groupIndex !== -1;

    if (groupAlreadyCreated) {
      const newAcc = [...acc];
      newAcc[groupIndex] = {
        ...newAcc[groupIndex],
        matches: addOrderedToMatches({
          matches: newAcc[groupIndex].matches,
          match: { matchId: match.id, date: match.date },
        }),
        teams: [...new Set([
          ...newAcc[groupIndex].teams,
          ...match.teams,
        ])],
      };

      return newAcc;
    }
    return [
      ...acc,
      {
        id: dayNumber + month,
        dayNumber,
        month,
        label: `${dayName}. ${dayNumber} de ${month}`,
        matches: [{ matchId: match.id, date: match.date }],
        teams: [...match.teams],
      },
    ];
  }, []);
  const orderedDateGroups = dateGroups.sort((a, b) => {
    if (a.month === 'nov' && b.month === 'dic') return -1;
    if (a.month === 'dic' && b.month === 'nov') return 1;
    if (a.dayNumber < b.dayNumber) return -1;
    return 1;
  });
  const transformedDateGroups = orderedDateGroups.map((group) => ({
    ...group,
    matches: group.matches.map((match) => match.matchId),
  }));

  return transformedDateGroups;
};

export const transformUsers = (users) => {
  const activeUsers = users.filter((user) => user?.photoURL && user?.email && user?.displayName);
  const orderedUsers = activeUsers.sort((a, b) => b.points - a.points);

  return orderedUsers;
};
