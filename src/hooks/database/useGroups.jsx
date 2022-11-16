import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useGroups = (db) => {
  const { document: groups, loading } = useRealTimeFirestoreCollection({
    db,
    collectionName: 'groups',
  });

  return { groups, loading };
};

export default useGroups;
