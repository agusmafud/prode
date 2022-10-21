import { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';

const useFirestore = (firebaseApp) => {
  const [firestore, setFirestore] = useState();

  useEffect(() => {
    if (firebaseApp && !firestore) {
      const initialDb = getFirestore(firebaseApp);

      setFirestore(initialDb);
    }
  }, [firebaseApp, firestore]);

  return firestore;
};

export default useFirestore;
