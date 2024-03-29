import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useUserMatchScore = ({ db, uid, matchId }) => {
  const { document } = useRealTimeFirestoreCollection({
    db,
    collectionName: `results/${uid}/matches/${matchId}/score`,
  });
  const userMatchScore = document ?? [];

  const setTeamUserScore = ({ teamId, goals }) => {
    setFirebaseDocument({
      db,
      item: { id: teamId, goals },
      documentName: `results/${uid}/matches/${matchId}/score`,
    });
  };

  return {
    userMatchScore,
    setTeamUserScore,
  };
};

export default useUserMatchScore;
