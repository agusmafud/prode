import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useMatches = (db) => {
  const matches = useRealTimeFirestoreCollection({
    db,
    collectionName: 'matches',
  });

  return matches;
};

export default useMatches;
