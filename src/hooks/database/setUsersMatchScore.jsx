import { collection, getDocs } from 'firebase/firestore';

import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';
import { getGoals } from 'helpers';

const setUsersMatchScore = async ({
  db,
  users,
  matchId,
  teamA,
  teamB,
}) => {
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
  const getUserTournamentMatches = (uid) => (
    users.find((user) => user.id === uid).matches ?? []
  );

  users.forEach(async (user) => {
    const loadedScore = await getUserMatchResult(user.id);
    const score = {
      [teamA.label]: getGoals({ teamId: teamA.id, score: loadedScore, defaultToZero: true }),
      [teamB.label]: getGoals({ teamId: teamB.id, score: loadedScore, defaultToZero: true }),
    };
    const initialTournamentMatches = getUserTournamentMatches(user.id);
    const filteredTournamentMatches = initialTournamentMatches.filter(
      (match) => match.matchId !== matchId,
    );
    const correspondingMatch = initialTournamentMatches.find(
      (match) => match.matchId === matchId,
    );
    const newMatchData = correspondingMatch
      ? { ...correspondingMatch, score }
      : {
        matchId,
        label: `${teamA.label} - ${teamB.label}`,
        score,
      };
    const tournamentMatches = [...filteredTournamentMatches, newMatchData];
    const orderedTournamentMatches = tournamentMatches.sort(
      (a, b) => Number(a.matchId) - Number(b.matchId),
    );
    setFirebaseDocument({
      db,
      item: {
        id: user.id,
        matches: orderedTournamentMatches,
      },
      documentName: 'users',
      merge: true,
    });
  });
};

export default setUsersMatchScore;
