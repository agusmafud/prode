import React from 'react';
import {
  Button,
  Center,
  Image,
  VStack,
} from '@chakra-ui/react';

const Login = ({ handleSignIn }) => (
  <Center
    bg="green.100"
    height="100vh"
    color="white"
  >
    <VStack>
      <Image src="https://tn.com.ar/resizer/7D7fPtui-1MpObxzIaFVOkz4L3w=/767x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/B2HFHX62JZBGNEUVTMAE4EAKBM.jpg" />
      <Button
        colorScheme="teal"
        size="lg"
        onClick={handleSignIn}
      >
        Comenzar
      </Button>
    </VStack>
  </Center>
);

export default Login;
