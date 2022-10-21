import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';

const useGroups = (db) => {
  const groups = useFirestoreCollection({
    db,
    collectionName: 'groups',
  });

  return groups;
};

export default useGroups;
