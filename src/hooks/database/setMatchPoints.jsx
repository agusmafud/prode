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

  users.forEach(async (user) => {
    // eslint-disable-next-line no-unused-vars
    const previousPoints = await getPreviousMatchPoints(user.id);
    // eslint-disable-next-line no-debugger
    debugger;
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

    // NO ESTÁ RESTANDO BIEN CUANDO SE CAMBIA UN RESULTADO CON PARTIDO CORRECTO
    // eslint-disable-next-line no-unused-vars
    const tournamentPoints = getUserTournamentPoints(user.id);
    // eslint-disable-next-line no-debugger
    debugger;
    setFirebaseDocument({
      db,
      item: {
        id: user.id,
        points: tournamentPoints - previousPoints + totalPoints,
      },
      documentName: 'users',
      merge: true,
    });
  });
};

export default setMatchPoints;
