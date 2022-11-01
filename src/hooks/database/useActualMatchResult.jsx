import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';

const useActualMatchResult = ({ db, matchId }) => {
  const results = useFirestoreCollection({
    db,
    collectionName: `actualResults/${matchId}/score`,
  });
  const resultsData = results ?? [];

  return resultsData;
};

export default useActualMatchResult;
