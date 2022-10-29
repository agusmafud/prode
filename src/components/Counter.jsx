import React from 'react';
import {
  Button,
  Grid,
  GridItem,
  Input,
  useNumberInput,
} from '@chakra-ui/react';

const Counter = ({
  id,
  value,
  setValue,
}) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: 0,
    max: 999,
    value,
    // TODO: Revisar onChange para el caso undefined
    onChange: (newValue) => setValue({
      id,
      newValue: newValue === '' ? 0 : newValue,
    }),
  });
  const incrementButtonPropsOne = getIncrementButtonProps();
  const decrementButtonPropsOne = getDecrementButtonProps();
  const inputPropsOne = getInputProps();

  return (
    <Grid
      maxW="120px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
      border="1px solid"
      borderColor="gray.200"
      background="white"
      padding={1}
      alignSelf="center"
    >
      <GridItem
        rowSpan={1}
        colSpan={2}
        mb={1}
      >
        <Input
          {...inputPropsOne}
          fontSize={20}
          fontWeight={600}
          textAlign="center"
        />
      </GridItem>
      <GridItem
        display="flex"
        justifyContent="center"
      >
        <Button {...decrementButtonPropsOne}>-</Button>
      </GridItem>
      <GridItem
        display="flex"
        justifyContent="center"
      >
        <Button {...incrementButtonPropsOne}>+</Button>
      </GridItem>
    </Grid>
  );
};

export default Counter;
