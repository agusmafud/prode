import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';

const useUsers = ({ db }) => {
  const { document } = useRealTimeFirestoreCollection({
    db,
    collectionName: 'users',
  });
  const users = document ?? [];

  return users;
};

export default useUsers;
