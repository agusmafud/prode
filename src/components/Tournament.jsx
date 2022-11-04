import React from 'react';
import {
  Accordion,
  Box,
} from '@chakra-ui/react';

import Group from 'components/Group';
import TournamentData from 'components/TournamentData';
import { getGroupTeamsData, getGroupMatchesData } from 'helpers';

const Tournament = ({
  user,
  teams,
  matches,
  groups,
  dbProps,
}) => (
  <Box
    width="100%"
    maxWidth="800"
  >
    <TournamentData user={user} />
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
        {groups.map((group) => {
          const {
            teams: groupTeams,
            matches: groupMatches,
            ...groupData
          } = group;
          const groupTeamsData = getGroupTeamsData({ groupTeams, teams });
          const groupMatchesData = getGroupMatchesData({ groupMatches, matches });

          return (
            <Group
              key={group.id}
              group={groupData}
              teams={groupTeamsData}
              matches={groupMatchesData}
              dbProps={dbProps}
            />
          );
        })}
      </Accordion>
    </Box>
  </Box>
);

export default Tournament;
