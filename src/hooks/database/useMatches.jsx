import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useMatches = (db) => {
  const { document: matches, loading } = useRealTimeFirestoreCollection({
    db,
    collectionName: 'matches',
  });

  return { matches, loading };
};

export default useMatches;
