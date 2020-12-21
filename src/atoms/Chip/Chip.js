import React from "react";
import styled from "styled-components";
import { Text } from "atoms/Text";
import { Box } from "atoms/Box";
import { variant } from "styled-system";

const ChipBase = styled(Box)`
  outline: none;
  cursor: pointer;
  ${variant({
    variants: {
      primary: {
        color: "primary.550",
        bg: "grey.600",
        width: "100%",
        border: 0,
      },
      selected: {
        color: "white",
        bg: "primary.550",
        width: "100%",
        border: 0,
      },
    },
  })}
`;

export const Chip = ({ text, px, ...props }) => {
  return (
    <ChipBase py="1rem" px={px} borderRadius="3rem" {...props}>
      <Text as="h3" variant="body" fontWeight="500" m={0}>
        {text}
      </Text>
    </ChipBase>
  );
};

Chip.defaultProps = {
  as: "button",
  px: "2rem",
};
