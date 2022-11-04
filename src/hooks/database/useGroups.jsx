import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useGroups = (db) => {
  const groups = useRealTimeFirestoreCollection({
    db,
    collectionName: 'groups',
  });

  return groups;
};

export default useGroups;
