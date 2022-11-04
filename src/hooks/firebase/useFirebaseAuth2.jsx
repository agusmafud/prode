import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

const useFirebaseAuth = (firebaseApp) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      if (result) {
        setUser(result.user);
      }
    };

    if (firebaseApp && !user) {
      getUser();
    }
  }, [firebaseApp, user]);

  return { user, handleSignIn: () => {} };
};

export default useFirebaseAuth;
