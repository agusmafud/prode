import useRealTimeFirestoreCollection from 'hooks/firebase/useRealTimeFirestoreCollection';
import setFirebaseDocument from 'hooks/firebase/setFirebaseDocument';

const useUserMatchPoints = ({ db, uid, matchId }) => {
  const response = useRealTimeFirestoreCollection({
    db,
    collectionName: `results/${uid}/matches/${matchId}/points`,
  });
  const userMatchPoints = response ?? ({
    match: { state: false, points: 0 },
    exact: { state: false, points: 0 },
  });

  const setTeamUserPoints = ({ teamId, goals }) => {
    setFirebaseDocument({
      db,
      item: { id: teamId, goals },
      documentName: `results/${uid}/matches/${matchId}/points`,
    });
  };

  return {
    userMatchPoints,
    setTeamUserPoints,
  };
};

export default useUserMatchPoints;
