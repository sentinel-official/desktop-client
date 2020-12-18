import React from "react";
import { Text } from "atoms/Text";

export const ModalClose = ({ onClick }) => {
  return (
    <Text
      as="div"
      fontSize="28px"
      cursor="pointer"
      data-testid="Signin-modal-close-btn"
      onClick={onClick}
      position="absolute"
      right="1.5rem"
      top="1.5rem"
      zIndex={5}
    >
      &times;
    </Text>
  );
};
