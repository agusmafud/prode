import { useDimensions } from '@chakra-ui/react';

const useWidth = ({
  elementRef,
  observe = true,
}) => {
  const size = useDimensions(elementRef, observe);
  const width = size && size.borderBox.width;

  return width ?? 0;
};

export default useWidth;
