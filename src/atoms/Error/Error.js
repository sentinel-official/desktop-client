import { Text } from "atoms/Text";

export const Error = ({ children }) => {
  return (
    <Text
      as="span"
      variant="small"
      color="red"
      position="absolute"
      bottom="-2rem"
      left="0px"
    >
      {children}
    </Text>
  );
};
