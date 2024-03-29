import React from 'react';
import { Flex } from '@chakra-ui/react';

import background from 'assets/background.jpg';

const AppLayout = ({
  children,
}) => (
  <Flex
    backgroundImage={background}
    backgroundRepeat="repeat/no-repeat"
    width="100%"
    minWidth="300px"
    minHeight="100vh"
    flexDirection="column"
    alignItems="center"
    justifyContent="flex-start"
  >
    <Flex
      background="rgba(255,255,255,0.8)"
      width="90%"
      maxWidth="1200px"
      height="auto"
      minHeight="100vh"
      paddingX={2}
      paddingY={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      {children}
    </Flex>
  </Flex>
);

export default AppLayout;
