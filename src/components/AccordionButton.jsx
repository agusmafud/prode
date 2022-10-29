import React from 'react';
import {
  AccordionButton as ChakraAccordionButton,
  AccordionIcon,
  Text,
} from '@chakra-ui/react';

const AccordionButton = ({ label }) => (
  <ChakraAccordionButton
    background="#fff"
    padding={4}
    _hover={{
      background: '#ddd',
    }}
    _expanded={{
      borderBottomWidth: '1px',
      borderColor: 'gray.200',
    }}
  >
    <Text
      textAlign="left"
      flex="1"
      fontSize={{ base: 'md', lg: 'xl' }}
    >
      {label}
    </Text>
    <AccordionIcon />
  </ChakraAccordionButton>
);

export default AccordionButton;
