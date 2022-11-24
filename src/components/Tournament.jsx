import React from 'react';
import {
  Accordion,
  Box,
  Center,
  /* Tabs,
  TabList,
  Tab, */
} from '@chakra-ui/react';

import GroupContainer from 'containers/GroupContainer';
import TournamentData from 'components/TournamentData';
// import { GROUPS_VIEW, DATE_VIEW } from 'containers/TournamentContainer';

const Tournament = ({
  user,
  users,
  teams,
  matches,
  groups,
  // currentView,
  // setCurrentView,
  dbProps,
  actualResultsEditable,
  toggleActualResultsEditable,
  time,
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
      matches={matches}
      toggleActualResultsEditable={toggleActualResultsEditable}
    />
    <Center>
      {/* <Tabs
        index={currentView === GROUPS_VIEW ? 0 : 1}
        onChange={(index) => setCurrentView(index === 0 ? GROUPS_VIEW : DATE_VIEW)}
        variant="soft-rounded"
        colorScheme="orange"
        size={{ base: 'sm', md: 'lg' }}
        marginBottom={{ base: 2, md: 4 }}
      >
        <TabList>
          <Tab>Ver Grupos</Tab>
          <Tab>Ver por fecha</Tab>
        </TabList>
      </Tabs> */}
    </Center>
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
            user={user}
            users={users}
            time={time}
          />
        ))}
      </Accordion>
    </Box>
  </Box>
);

export default Tournament;
