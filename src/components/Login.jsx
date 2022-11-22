import React from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Text,
} from '@chakra-ui/react';
import MessiWall from './MessiWall';

const Login = ({
  handleSignIn,
  version,
  saveLogin,
  setSaveLogin,
}) => (
  <MessiWall>
    <Flex direction="column">
      <Button
        width={{ base: '150px', md: '200px' }}
        height="80px"
        colorScheme="whatsapp"
        size="lg"
        fontSize={{ base: '3xl', md: '4xl' }}
        letterSpacing={1.3}
        textShadow="0 0 4px #333"
        shadow="0 0 4px white"
        border="2px solid white"
        onClick={handleSignIn}
      >
        JUGAR
      </Button>
      <Checkbox
        color="whiteAlpha.800"
        marginTop={2}
        isChecked={saveLogin}
        onChange={(e) => setSaveLogin(e.target.checked)}
      >
        Guardar usuario
      </Checkbox>
      <Text
        fontSize="sm"
        color="whiteAlpha.800"
        marginTop={2}
        marginBottom={-2}
      >
        {`Versión: ${version}`}
      </Text>
    </Flex>
  </MessiWall>
);

export default Login;
