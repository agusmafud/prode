import React from 'react';
import {
  Accordion,
  Box,
} from '@chakra-ui/react';

import GroupContainer from 'containers/GroupContainer';
import TournamentData from 'components/TournamentData';

const Tournament = ({
  user,
  users,
  teams,
  matches,
  groups,
  dbProps,
  actualResultsEditable,
}) => (
  <Box
    width="100%"
    maxWidth="800"
    paddingX={2}
    paddingY={{ base: 4, lg: 10 }}
  >
    <TournamentData
      user={user}
      users={users}
    />
    <Box
      background="rgba(0,0,0,0.2)"
      borderRadius={10}
      padding={{ base: 2, lg: 6 }}
    >
      <Accordion
        allowMultiple
        defaultIndex={[]}
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderColor="gray.200"
      >
        {groups.map((group) => (
          <GroupContainer
            key={group.id}
            group={group}
            teams={teams}
            matches={matches}
            dbProps={dbProps}
            actualResultsEditable={actualResultsEditable}
            users={users}
          />
        ))}
      </Accordion>
    </Box>
  </Box>
);

export default Tournament;
