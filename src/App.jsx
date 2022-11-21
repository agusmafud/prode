import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppLayout from 'components/AppLayout';
import Login from 'components/Login';
import TournamentContainer from 'containers/TournamentContainer';
import useFirebaseApp from 'hooks/firebase/useFirebaseApp';
import useFirebaseAuth from 'hooks/firebase/useFirebaseAuth';
import useFirestore from 'hooks/firebase/useFirestore';
import useSetUser from 'hooks/database/useSetUser';

import { firebaseConfig } from 'constants';
import Loading from 'components/Loading';

const App = () => {
  const firebaseApp = useFirebaseApp(firebaseConfig);
  const { user, userLoading, handleSignIn } = useFirebaseAuth(firebaseApp);
  const db = useFirestore(firebaseApp);
  const users = useSetUser({ db, user });

  const showLogin = !user && !userLoading;
  const showLoading = !user && userLoading;
  const showTournament = !!user;

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
