import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useTeams = (db) => {
  const { document: teams, loading } = useRealTimeFirestoreCollection({
    db,
    collectionName: 'teams',
  });

  return { teams, loading };
};

export default useTeams;
