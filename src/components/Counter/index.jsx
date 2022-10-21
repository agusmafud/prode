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
    onChange: (newValue) => setValue({ id, newValue }),
  });
  const incrementButtonPropsOne = getIncrementButtonProps();
  const decrementButtonPropsOne = getDecrementButtonProps();
  const inputPropsOne = getInputProps();

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={2}
      border="1px solid grey"
    >
      <GridItem rowSpan={1} colSpan={2}>
        <Input {...inputPropsOne} />
      </GridItem>
      <GridItem>
        <Button {...decrementButtonPropsOne}>-</Button>
      </GridItem>
      <GridItem>
        <Button {...incrementButtonPropsOne}>+</Button>
      </GridItem>
    </Grid>
  );
};

export default Counter;
