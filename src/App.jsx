import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppContainer from 'components/AppContainer';
import Login from 'components/Login';
import Tournament from 'components/Tournament';
import useFirebaseApp from 'hooks/firebase/useFirebaseApp';
import useFirebaseAuth from 'hooks/firebase/useFirebaseAuth';
import useFirestore from 'hooks/firebase/useFirestore';
import useGroups from 'hooks/database/useGroups';
import useMatches from 'hooks/database/useMatches';
import useTeams from 'hooks/database/useTeams';
import { firebaseConfig } from 'constants';

const App = () => {
  const firebaseApp = useFirebaseApp(firebaseConfig);
  const { user, handleSignIn } = useFirebaseAuth(firebaseApp);

  const db = useFirestore(firebaseApp);
  const teams = useTeams(db);
  const matches = useMatches(db);
  const groups = useGroups(db);
  // TODO: Add to context for avoid multiple drilling down
  const dbProps = { db, uid: user?.uid };

  const showTournament = teams && matches && groups;

  return (
    <ChakraProvider resetCSS>
      <AppContainer>
        {!user
          ? <Login handleSignIn={handleSignIn} />
          : showTournament && (
            <Tournament
              user={user}
              teams={teams}
              matches={matches}
              groups={groups}
              dbProps={dbProps}
            />
          )}
      </AppContainer>
    </ChakraProvider>
  );
};

export default App;
