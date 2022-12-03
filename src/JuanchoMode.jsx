import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppLayout from 'components/AppLayout';
import Login from 'components/Login';
import TournamentContainer from 'containers/TournamentContainer';
import useFirebaseApp from 'hooks/firebase/useFirebaseApp';
import useSimpleFirebaseAuth from 'hooks/firebase/useSimpleFirebaseAuth';
import useFirestore from 'hooks/firebase/useFirestore';
import useSetUser from 'hooks/database/useSetUser';

import { firebaseConfig } from 'constants';
import Loading from 'components/Loading';

const App = () => {
  const firebaseApp = useFirebaseApp(firebaseConfig);
  const {
    user,
    userLoading,
    handleSignIn,
  } = useSimpleFirebaseAuth(firebaseApp);
  const db = useFirestore(firebaseApp);
  const users = useSetUser({ db, user });

  const showLogin = !user && !userLoading;
  const showLoading = !user && userLoading;
  const showTournament = !!user;

  const version = '1.07';
  const [actualResultsEditable, setActualResultsEditable] = useState(false);
  const toggleActualResultsEditable = () => (
    user.uid === '448AqmKAQITCjgAJ03l1RGPYrX42' && setActualResultsEditable((prevState) => !prevState)
  );

  return (
    <ChakraProvider resetCSS>
      <AppLayout>
        {showLogin && (
          <Login
            handleSignIn={handleSignIn}
            version={version}
            saveLogin={false}
            setSaveLogin={() => {}}
          />
        )}
        {showLoading && <Loading version={version} />}
        {showTournament && (
          <TournamentContainer
            user={user}
            users={users}
            actualResultsEditable={actualResultsEditable}
            toggleActualResultsEditable={toggleActualResultsEditable}
            db={db}
            version={version}
          />
        )}
      </AppLayout>
    </ChakraProvider>
  );
};

export default App;
