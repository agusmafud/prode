import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useActualMatchScore = ({ db, matchId }) => {
  const { document } = useRealTimeFirestoreCollection({
    db,
    collectionName: `actualResults/${matchId}/score`,
  });
  const actualMatchScore = document ?? [];

  const setActualMatchScore = ({ teamId, goals }) => {
    setFirebaseDocument({
      db,
      item: { id: teamId, goals },
      documentName: `actualResults/${matchId}/score`,
    });
  };

  return {
    actualMatchScore,
    setActualMatchScore,
  };
};

export default useActualMatchScore;
