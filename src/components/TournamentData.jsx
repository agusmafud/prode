import React from 'react';
import {
  Flex,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react';

const TournamentData = ({
  user,
}) => (
  <Flex
    marginBottom={6}
    padding={6}
    alignItems="center"
    justifyContent="center"
    background="rgba(0,0,0,0.2)"
    borderRadius={10}
  >
    <Avatar
      src={user.photoURL}
      name={user.displayName}
      size="lg"
      border="1px solid #4A5568"
    />
    <Box ml="3">
      <Text
        fontSize="xl"
        fontWeight="bold"
      >
        {user.displayName}
      </Text>
    </Box>
  </Flex>
);

export default TournamentData;
