// TODO: Review if is required or delete
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const useGetAllFirestoreCollection = ({
  db,
  collectionName,
}) => {
  const [document, setDocument] = useState();

  useEffect(() => {
    const getCollection = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const results = [];

      querySnapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setDocument(results);
    };

    if (!document && db && collectionName) {
      getCollection();
    }
  }, [document, db, collectionName]);

  return document;
};

export default useGetAllFirestoreCollection;
