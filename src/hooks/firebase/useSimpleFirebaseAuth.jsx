import { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import useStorage from 'hooks/useStorage';

const useSimpleFirebaseAuth = (firebaseApp) => {
  const [handleSignIn, setHandleSignIn] = useState();

  const [userLoading, setUserLoading] = useStorage({
    key: 'userLoading',
    initialValue: false,
    useSession: true,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (firebaseApp && !handleSignIn) {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const initialHandleSignIn = async () => {
        setUserLoading(true);
        const result = await signInWithPopup(auth, provider);
        if (result) {
          setUser(result.user);
          setUserLoading(false);
        }
      };

      setHandleSignIn(() => initialHandleSignIn);
    }
  }, [firebaseApp, handleSignIn, user, setUserLoading]);

  return {
    user,
    userLoading,
    handleSignIn,
  };
};

export default useSimpleFirebaseAuth;
