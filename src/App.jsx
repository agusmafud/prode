import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppLayout from 'components/AppLayout';
import Login from 'components/Login';
import Tournament from 'components/Tournament';
import useFirebaseApp from 'hooks/firebase/useFirebaseApp';
import useFirebaseAuth from 'hooks/firebase/useFirebaseAuth';
import useFirestore from 'hooks/firebase/useFirestore';
import useGroups from 'hooks/database/useGroups';
import useMatches from 'hooks/database/useMatches';
import useTeams from 'hooks/database/useTeams';

import { firebaseConfig } from 'constants';
import useTime from 'hooks/useTime';
import Loading from 'components/Loading';

const App = () => {
  const firebaseApp = useFirebaseApp(firebaseConfig);
  const { user, userLoading, handleSignIn } = useFirebaseAuth(firebaseApp);
  const time = useTime();

  const db = useFirestore(firebaseApp);
  const teams = useTeams(db);
  const matches = useMatches(db);
  const groups = useGroups(db);
  console.log('groups: ', groups);
  console.log('matches: ', matches);
  console.log('teams: ', teams);

  // TODO: Add to context for avoid multiple drilling down
  const dbProps = {
    db,
    uid: user?.uid,
    time,
  };

  const showLogin = !user && !userLoading;
  const showLoading = !user && userLoading;
  const showTournament = user && teams && matches && groups;

  return (
    <ChakraProvider resetCSS>
      <AppLayout extraPadding={!showLogin}>
        {showLogin && (
          <Login
            handleSignIn={handleSignIn}
            userLoading={userLoading}
          />
        )}
        {showLoading && <Loading />}
        {showTournament && (
          <Tournament
            user={user}
            teams={teams}
            matches={matches}
            groups={groups}
            dbProps={dbProps}
          />
        )}
      </AppLayout>
    </ChakraProvider>
  );
};

export default App;
