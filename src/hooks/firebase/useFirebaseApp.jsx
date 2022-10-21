import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';

const useFirebase = (firebaseConfig) => {
  const [app, setApp] = useState();

  useEffect(() => {
    if (!app) {
      const initialApp = initializeApp(firebaseConfig);

      setApp(initialApp);
    }
  }, [app, firebaseConfig]);

  return app;
};

export default useFirebase;
