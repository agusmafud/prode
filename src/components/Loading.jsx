import React from 'react';
import { Spinner, Text, HStack } from '@chakra-ui/react';
import MessiWall from './MessiWall';

const Loading = () => (
  <MessiWall>
    <HStack
      width="100%"
      height="100%"
      gap={3}
    >
      <Text
        size="lg"
        fontSize={{ base: 'xl', md: '4xl' }}
        letterSpacing={1.3}
        color="white"
        fontWeight="bold"
        textShadow="0 0 4px white"
      >
        CARGANDO
      </Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        fontSize={{ base: 'md', md: 'xl' }}
      />
    </HStack>
  </MessiWall>
);

export default Loading;
