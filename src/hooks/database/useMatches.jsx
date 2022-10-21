import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';

const useMatches = (db) => {
  const matches = useFirestoreCollection({
    db,
    collectionName: 'matches',
  });

  return matches;
};

export default useMatches;
