import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const setFirebaseDocument = async ({ db, item, documentName }) => {
  const { id, ...rest } = item;

  await setDoc(doc(db, documentName, id.toString()), {
    ...rest,
  });
};
export default setFirebaseDocument;

export const useSetGroups = ({ db, groups }) => {
  useEffect(() => {
    if (db) {
      groups.forEach((group) => setFirebaseDocument({ db, item: group, documentName: 'groups' }));
    }
  }, [db, groups]);
};

export const useSetMatches = ({ db, matches }) => {
  useEffect(() => {
    if (db) {
      matches.forEach((match) => setFirebaseDocument({ db, item: match, documentName: 'matches' }));
    }
  }, [db, matches]);
};
