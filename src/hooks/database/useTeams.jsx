import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useTeams = (db) => {
  const teams = useRealTimeFirestoreCollection({
    db,
    collectionName: 'teams',
  });

  return teams;
};

export default useTeams;
