import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppLayout from 'components/AppLayout';
import Login from 'components/Login';
import TournamentContainer from 'containers/TournamentContainer';
import useFirebaseApp from 'hooks/firebase/useFirebaseApp';
import useFirebaseAuth from 'hooks/firebase/useFirebaseAuth';
import useFirestore from 'hooks/firebase/useFirestore';
import useSetUser from 'hooks/database/useSetUser';
/* import { useSetTeams, useSetMatches, useSetGroups } from 'hooks/firebase/setFirebaseDocument'; */

import { firebaseConfig } from 'constants';
import Loading from 'components/Loading';

/* const teams = [
  { id: 'Milan', label: 'Milan' },
  { id: 'Fiorentina', label: 'Fiorentina' },
  { id: 'Juventus', label: 'Juventus' },
  { id: 'Lazio', label: 'Lazio' },
  { id: 'Monaco', label: 'Mónaco' },
  { id: 'Olympique', label: 'Olympique de Marsella' },
  { id: 'River', label: 'River' },
  { id: 'Betis', label: 'Betis' },
];

const matches = [
  {
    id: '200',
    date: new Date('13 November 2022 14:10:00 UTC-03:00'),
    teams: ['Milan', 'Fiorentina'],
  },
  {
    id: '201',
    date: new Date('13 November 2022 16:45:00 UTC-03:00'),
    teams: ['Juventus', 'Lazio'],
  },
  {
    id: '202',
    date: new Date('13 November 2022 16:45:00 UTC-03:00'),
    teams: ['Monaco', 'Olympique'],
  },
  {
    id: '203',
    date: new Date('13 November 2022 21:00:00 UTC-03:00'),
    teams: ['River', 'Betis'],
  },
];

const groups = [
  {
    id: 'groupTest',
    label: 'Grupo de Prueba',
    teams: ['Milan', 'Fiorentina', 'Juventus', 'Lazio', 'Monaco', 'Olympique', 'River', 'Betis'],
    matches: ['200', '201', '202', '203'],
  },
]; */

const App = () => {
  const firebaseApp = useFirebaseApp(firebaseConfig);
  const { user, userLoading, handleSignIn } = useFirebaseAuth(firebaseApp);
  const db = useFirestore(firebaseApp);
  const users = useSetUser({ db, user });

  const showLogin = !user && !userLoading;
  const showLoading = !user && userLoading;
  const showTournament = !!user;

  /* useSetTeams({ db, teams });
  useSetMatches({ db, matches });
  useSetGroups({ db, groups }); */

  return (
    <ChakraProvider resetCSS>
      <AppLayout>
        {showLogin && (
          <Login
            handleSignIn={handleSignIn}
            userLoading={userLoading}
          />
        )}
        {showLoading && <Loading />}
        {showTournament && (
          <TournamentContainer
            user={user}
            users={users}
            db={db}
          />
        )}
      </AppLayout>
    </ChakraProvider>
  );
};

export default App;
