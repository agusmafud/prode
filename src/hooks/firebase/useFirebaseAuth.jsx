import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

import useStorage from 'hooks/useStorage';

const useFirebaseAuth = (firebaseApp) => {
  const [handleSignIn, setHandleSignIn] = useState();

  const [persistedUser, setPersistedUser] = useStorage({ key: 'user', initialValue: null });
  const [userLoading, setUserLoading] = useStorage({
    key: 'userLoading',
    initialValue: false,
    useSession: true,
  });
  const [user, setUser] = useState(persistedUser);

  useEffect(() => {
    const getUser = async (auth) => {
      const result = await getRedirectResult(auth);
      if (result) {
        setUser(result.user);
        setPersistedUser(result.user);
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
  }, [firebaseApp, handleSignIn, user, setPersistedUser, setUserLoading]);

  return { user, userLoading, handleSignIn };
};

export default useFirebaseAuth;
