import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const setFirebaseDocument = async ({
  db,
  item,
  documentName,
  merge = false,
}) => {
  const { id, ...rest } = item;

  const stringId = typeof id === 'number'
    ? id.toString()
    : id;

  await setDoc(
    doc(db, documentName, stringId),
    { ...rest },
    { merge },
  );
};
export default setFirebaseDocument;

export const useSetGroups = ({ db, groups }) => {
  useEffect(() => {
    if (db) {
      // eslint-disable-next-line no-debugger
      debugger;
      groups.forEach((group) => setFirebaseDocument({ db, item: group, documentName: 'groups' }));
    }
  }, [db, groups]);
};

export const useSetMatches = ({ db, matches }) => {
  useEffect(() => {
    if (db) {
      // eslint-disable-next-line no-debugger
      debugger;
      matches.forEach((match) => setFirebaseDocument({ db, item: match, documentName: 'matches' }));
    }
  }, [db, matches]);
};

export const useSetTeams = ({ db, teams }) => {
  useEffect(() => {
    if (db) {
      // eslint-disable-next-line no-debugger
      debugger;
      teams.forEach((team) => setFirebaseDocument({ db, item: team, documentName: 'teams' }));
    }
  }, [db, teams]);
};
