import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useUserMatchPoints = ({ db, uid, matchId }) => {
  const createPointsObject = (doc) => {
    if (doc?.length > 0) {
      const match = doc.find((d) => d.id === 'match');
      const exact = doc.find((d) => d.id === 'exact');

      if (match && exact) return ({ match, exact });
    }
    return ({
      match: { state: false, points: 0 },
      exact: { state: false, points: 0 },
    });
  };

  const { document } = useRealTimeFirestoreCollection({
    db,
    collectionName: `results/${uid}/matches/${matchId}/points`,
  });
  const userMatchPoints = createPointsObject(document);

  return userMatchPoints;
};

export default useUserMatchPoints;
