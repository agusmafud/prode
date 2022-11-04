import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useActualMatchScore = ({ db, matchId }) => {
  const response = useRealTimeFirestoreCollection({
    db,
    collectionName: `actualResults/${matchId}/score`,
  });
  const actualMatchScore = response ?? [];

  return actualMatchScore;
};

export default useActualMatchScore;
