import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

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
  const { uid } = user;

  const db = useFirestore(firebaseApp);
  const teams = useTeams(db);
  const matches = useMatches(db);
  const groups = useGroups(db);
  // TODO: Add to context for avoid multiple drilling down
  const serverProps = { db, uid };

  const showTournament = teams && matches && groups;

  return (
    <ChakraProvider>
      {!user
        ? <Login handleSignIn={handleSignIn} />
        : showTournament && (
          <Tournament
            user={user}
            teams={teams}
            matches={matches}
            groups={groups}
            serverProps={serverProps}
          />
        )}
    </ChakraProvider>
  );
};

export default App;
