import React from 'react';
import {
  Accordion,
  Center,
  Text,
} from '@chakra-ui/react';

import Group from 'components/Group';
import { getGroupTeamsData, getGroupMatchesData } from 'helpers';

const Tournament = ({
  user,
  teams,
  matches,
  groups,
  serverProps,
}) => (
  <>
    <Center>
      <Text
        fontSize="4xl"
        marginBottom={4}
      >
        {user.displayName}
      </Text>
    </Center>
    <Accordion
      allowMultiple
      defaultIndex={[]}
      width="100%"
      maxWidth={800}
      minWidth={400}
      marginX="auto"
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
            serverProps={serverProps}
          />
        );
      })}
    </Accordion>
  </>
);

export default Tournament;
