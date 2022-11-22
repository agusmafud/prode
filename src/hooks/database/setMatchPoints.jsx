import { collection, getDocs } from 'firebase/firestore';

import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';
import { createPoints, getGoals } from 'helpers';

const setMatchPoints = async ({
  db,
  users,
  matchId,
  teamA,
  teamB,
}) => {
  const getPreviousMatchPoints = async (uid) => {
    const querySnapshot = await getDocs(collection(db, `results/${uid}/matches/${matchId}/points`));
    const results = [];

    querySnapshot.forEach((item) => {
      results.push({
        id: item.id,
        ...item.data(),
      });
    });

    if (results.length > 0) {
      const exact = results?.find((r) => r.id === 'exact');
      const match = results?.find((r) => r.id === 'match');
      if (exact && match) return (exact.points + match.points);
    }
    return 0;
  };
  const getUserMatchResult = async (uid) => {
    const querySnapshot = await getDocs(collection(db, `results/${uid}/matches/${matchId}/score`));
    const results = [];

    querySnapshot.forEach((item) => {
      results.push({
        id: item.id,
        ...item.data(),
      });
    });

    return results;
  };
  const getUserTournamentPoints = (uid) => (
    users.find((user) => user.id === uid).points ?? 0
  );
  const getUserTournamentMatches = (uid) => (
    users.find((user) => user.id === uid).matches ?? []
  );

  users.forEach(async (user) => {
    const previousPoints = await getPreviousMatchPoints(user.id);
    const score = await getUserMatchResult(user.id);
    const { points, totalPoints } = createPoints({
      teamA: { ...teamA, goals: getGoals({ teamId: teamA.id, score, defaultToZero: true }) },
      teamB: { ...teamB, goals: getGoals({ teamId: teamB.id, score, defaultToZero: true }) },
    });
    setFirebaseDocument({
      db,
      item: {
        id: 'exact',
        ...points.exact,
      },
      documentName: `results/${user.id}/matches/${matchId}/points`,
    });
    setFirebaseDocument({
      db,
      item: {
        id: 'match',
        ...points.match,
      },
      documentName: `results/${user.id}/matches/${matchId}/points`,
    });

    const tournamentPoints = getUserTournamentPoints(user.id);
    const matchData = {
      matchId,
      label: `${teamA.label} - ${teamB.label}`,
      points,
    };
    const createTournamentMatches = () => {
      const initialTournamentMatches = getUserTournamentMatches(user.id);
      const filteredTournamentMatches = initialTournamentMatches.filter(
        (match) => match.matchId !== matchId,
      );
      const tournamentMatches = [...filteredTournamentMatches, matchData];
      const orderedTournamentMatches = tournamentMatches.sort(
        (a, b) => Number(a.matchId) - Number(b.matchId),
      );

      return orderedTournamentMatches;
    };
    const tournamentMatches = createTournamentMatches();
    setFirebaseDocument({
      db,
      item: {
        id: user.id,
        points: tournamentPoints - previousPoints + totalPoints,
        matches: tournamentMatches,
      },
      documentName: 'users',
      merge: true,
    });
  });
};

export default setMatchPoints;
