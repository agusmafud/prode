import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

import useStorage from 'hooks/useStorage';

const useFirebaseAuth = (firebaseApp, persistUser) => {
  const [handleSignIn, setHandleSignIn] = useState();

  const [persistedUser, setPersistedUser] = useStorage({
    key: 'user',
    initialValue: null,
  });
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState(() => (persistUser ? persistedUser : null));

  useEffect(() => {
    const getUser = async (auth) => {
      const result = await getRedirectResult(auth);
      if (result) {
        // eslint-disable-next-line no-alert, no-undef
        alert('Usuario logueado');
        setUser(result.user);
        if (persistUser) { setPersistedUser(result.user); }
        setUserLoading(false);
      }
    };

    if (firebaseApp && !handleSignIn) {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const initialHandleSignIn = () => {
        setUserLoading(true);
        signInWithRedirect(auth, provider);
      };

      setHandleSignIn(() => initialHandleSignIn);
      if (!user) getUser(auth);
    }
  }, [firebaseApp, handleSignIn, user, setUserLoading, persistUser, setPersistedUser]);

  return { user, userLoading, handleSignIn };
};

export default useFirebaseAuth;
