import React from 'react';
import { Button } from '@chakra-ui/react';
import MessiWall from './MessiWall';

const Login = ({
  handleSignIn,
}) => (
  <MessiWall>
    <Button
      width="200px"
      height="100%"
      colorScheme="whatsapp"
      size="lg"
      fontSize="4xl"
      letterSpacing={1.3}
      textShadow="0 0 4px #333"
      shadow="0 0 4px white"
      border="2px solid white"
      onClick={handleSignIn}
    >
      JUGAR
    </Button>
  </MessiWall>
);

export default Login;