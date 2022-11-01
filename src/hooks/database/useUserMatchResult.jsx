import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useUserMatchResult = ({ db, uid, matchId }) => {
  const results = useFirestoreCollection({
    db,
    collectionName: `results/${uid}/matches/${matchId}/score`,
  });
  const resultsData = results ?? [];

  const setTeamUserResult = ({ teamId, goals }) => {
    setFirebaseDocument({
      db,
      item: { id: teamId, goals },
      documentName: `results/${uid}/matches/${matchId}/score`,
    });
  };

  return {
    userResults: resultsData,
    setTeamUserResult,
  };
};

export default useUserMatchResult;
