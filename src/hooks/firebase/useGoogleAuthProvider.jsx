import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

import useLocalStorage from 'hooks/useLocalStorage';

const useGoogleAuthProvider = (firebaseApp) => {
  const [handleSignIn, setHandleSignIn] = useState();

  const [persistedUser, setPersistedUser] = useLocalStorage('user', null);
  const [user, setUser] = useState(persistedUser);

  useEffect(() => {
    const getUser = async (auth) => {
      const result = await getRedirectResult(auth);
      if (result) {
        setUser(result.user);
        setPersistedUser(result.user);
      }
    };

    if (firebaseApp && !handleSignIn) {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const initialHandleSignIn = () => signInWithRedirect(auth, provider);

      setHandleSignIn(() => initialHandleSignIn);

      if (!user) getUser(auth);
    }
  }, [firebaseApp, handleSignIn, user, setPersistedUser]);

  return { user, handleSignIn };
};

export default useGoogleAuthProvider;
