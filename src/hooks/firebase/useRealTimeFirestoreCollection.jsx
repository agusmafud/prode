import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query as firestoreQuery,
} from 'firebase/firestore';

const useRealTimeFirestoreCollection = ({
  db,
  collectionName,
  condition,
}) => {
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState();

  useEffect(() => {
    const getCollection = async () => {
      const collectionReference = collection(db, collectionName);
      const query = condition
        ? firestoreQuery(collectionReference, condition)
        : collectionReference;
      onSnapshot(query, (querySnapshot) => {
        const results = [];
        const initialUnsubscribe = querySnapshot.forEach((item) => {
          results.push({
            id: item.id,
            ...item.data(),
          });
        });
        setDocument(results);
        setUnsubscribe(initialUnsubscribe);
        setLoading(false);
      });
    };

    if (!document && db && collectionName) {
      setLoading(true);
      getCollection();
    }

    return () => { if (unsubscribe) unsubscribe(); };
  }, [document, db, collectionName, condition, unsubscribe]);

  return { document, loading };
};

export default useRealTimeFirestoreCollection;
