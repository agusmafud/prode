import React from 'react';

import Tournament from 'components/Tournament';
import useGroups from 'hooks/database/useGroups';
import useMatches from 'hooks/database/useMatches';
import useTeams from 'hooks/database/useTeams';

import useTime from 'hooks/useTime';
import Loading from 'components/Loading';

const TournamentEditContainer = ({
  user,
  db,
}) => {
  const time = useTime();
  const { teams, loading: teamsLoading } = useTeams(db);
  const { matches, loading: matchesLoading } = useMatches(db);
  const { groups, loading: groupsLoading } = useGroups(db);

  // TODO: Add to context for avoid multiple drilling down
  const dbProps = {
    db,
    uid: user?.uid,
    time,
  };

  const isLoading = groupsLoading || matchesLoading || teamsLoading;
  const showTournament = !isLoading && groups && matches && teams;

  return (
    <>
      {isLoading && <Loading />}
      {showTournament && (
        <Tournament
          user={user}
          teams={teams}
          matches={matches}
          groups={groups}
          dbProps={dbProps}
        />
      )}
    </>
  );
};

export default TournamentEditContainer;