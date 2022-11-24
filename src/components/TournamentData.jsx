import React from 'react';
import {
  Flex,
  Avatar,
  Box,
  Text,
  Show,
} from '@chakra-ui/react';

import ScoresTableModal from 'components/ScoresTableModal';

const TournamentData = ({
  user,
  users,
  matches,
  toggleActualResultsEditable,
}) => (
  <Flex
    marginBottom={6}
    padding={6}
    alignItems="center"
    justifyContent="center"
    background="rgba(0,0,0,0.2)"
    borderRadius={10}
  >
    <Show above="md">
      <Box flexGrow="1"> </Box>
    </Show>
    <Avatar
      src={user.photoURL}
      name={user.displayName}
      fontSize={{ base: 'md', md: 'lg' }}
      border="1px solid #4A5568"
      onClick={toggleActualResultsEditable}
    />
    <Box ml="3" flexGrow="1">
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="bold"
      >
        {user.displayName}
      </Text>
    </Box>
    <ScoresTableModal
      users={users}
      matches={matches}
    />
  </Flex>
);

export default TournamentData;
