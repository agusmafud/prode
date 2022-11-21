import { useEffect } from 'react';

import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useSetUser = ({ db, user }) => {
  const { document } = useRealTimeFirestoreCollection({
    db,
    collectionName: 'users',
  });
  const users = document ?? [];
  const userLoaded = users.find((u) => u.id === user?.uid);
  const shouldSetUser = db && document !== undefined && user && !userLoaded;
  const userDataMissing = (
    userLoaded
    && (
      !userLoaded?.email || !userLoaded?.photoURL || !userLoaded?.points
      || !userLoaded?.displayName || !userLoaded?.matches
    )
  );

  useEffect(() => {
    const setUser = ({
      uid,
      email,
      photoURL,
      displayName,
      points,
      matches,
    }) => {
      setFirebaseDocument({
        db,
        item: {
          id: uid,
          email,
          photoURL,
          displayName,
          points: points ?? 0,
          matches: matches ?? [],
        },
        documentName: 'users',
      });
    };

    if (shouldSetUser) {
      setUser(user);
    }
    if (userDataMissing) {
      setUser({
        ...user,
        points: userLoaded?.points ?? 0,
        matches: userLoaded?.matches ?? [],
      });
    }
  }, [db, user, userLoaded, userDataMissing, shouldSetUser]);

  return users;
};

export default useSetUser;
