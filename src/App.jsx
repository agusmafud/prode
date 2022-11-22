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
  // const [persistUser, setPersistUser] = useState(false);

  const firebaseApp = useFirebaseApp(firebaseConfig);
  const { user, userLoading, handleSignIn } = useFirebaseAuth(firebaseApp);
  const db = useFirestore(firebaseApp);
  const users = useSetUser({ db, user });

  const showLogin = !user && !userLoading;
  const showLoading = !user && userLoading;
  const showTournament = !!user;

  const version = '1.01';
  const actualResultsEditable = false;

  return (
    <ChakraProvider resetCSS>
      <AppLayout>
        {showLogin && (
          <Login
            handleSignIn={handleSignIn}
            version={version}
            // persistUser={persistUser}
            // setPersistUser={setPersistUser}
          />
        )}
        {showLoading && <Loading />}
        {showTournament && (
          <TournamentContainer
            user={user}
            users={users}
            actualResultsEditable={actualResultsEditable}
            db={db}
          />
        )}
      </AppLayout>
    </ChakraProvider>
  );
};

export default App;
