import useFirestoreCollection from 'hooks/firebase/useFirestoreCollection';

const useTeams = (db) => {
  const teams = useFirestoreCollection({
    db,
    collectionName: 'teams',
  });

  return teams;
};

export default useTeams;
