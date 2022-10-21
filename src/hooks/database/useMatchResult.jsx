import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useMatchResult = ({ db, uid, matchId }) => {
  const results = useFirestoreCollection({
    db,
    collectionName: `results/${uid}/matches/${matchId}/score`,
  });
  const resultsData = results ?? [];

  const setTeamResult = ({ teamId, goals }) => {
    setFirebaseDocument({
      db,
      item: { id: teamId, goals },
      documentName: `results/${uid}/matches/${matchId}/score`,
    });
  };

  return {
    results: resultsData,
    setTeamResult,
  };
};

export default useMatchResult;
