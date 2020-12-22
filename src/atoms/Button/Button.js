import React from "react";
import styled from "styled-components";
import {
  layout,
  color,
  space,
  variant,
  typography,
  fontSize,
  border,
} from "styled-system";

import { Box, Text } from "atoms";
import css from "@styled-system/css";
import { Flex } from "atoms/Flex";

const variants = {
  primary: {
    color: "white",
    px: 7,
    py: 4,
    backgroundColor: "primary.500",
    transition: "all 0.3s",
    border: 0,
    fontWeight: 500,
    letterSpacing: 0.4,
    borderRadius: "3rem",
    fontFamily: "Roboto",
    h3: {
      textTransform: "uppercase",
    },
    "&:hover": {},
    "&:focus": {
      outline: 0,
    },
  },
  secondary: {
    color: "#129EED !important",
    px: 7,
    py: 4,
    backgroundColor: "transparent",
    transition: "all 0.3s",
    border: "1px solid",
    borderColor: "primary.500",
    fontWeight: 500,
    letterSpacing: 0.4,
    borderRadius: "3rem",
    fontFamily: "Roboto",
    h3: {
      textTransform: "uppercase",
    },
    "&:hover": {},
    "&:focus": {
      outline: 0,
    },
  },

  primaryShadow: {
    color: "#55678B !important",
    px: 7,
    py: 4,
    backgroundColor: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.07)",
    border: 0,
    fontWeight: 500,
    letterSpacing: 0.4,
    borderRadius: "3rem",
    fontFamily: "Roboto",

    "&:hover": {},
    "&:focus": {
      outline: 0,
    },
  },

  greyBorder: {
    px: 7,
    py: 4,
    color: "#142D51 !important",
    fontWeight: "500",
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: "border.500",
    borderRadius: "3rem",
    fontFamily: "Roboto",
    outline: 0,
    "&:hover": {
      color: "white.0",
      backgroundColor: "gray.100",
    },
  },
  normal: {
    px: 7,
    py: 4,
    color: "#8EA1C8 !important",
    fontWeight: "500",
    backgroundColor: "transparent",
    border: "none",
    fontFamily: "Roboto",
    outline: 0,
    "&:hover": {
      color: "white.0",
      backgroundColor: "gray.100",
    },
  },

  withoutBorder: {
    px: 7,
    py: "1rem",
    width: "100%",
    color: "#142D51 !important",
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: "border.500",
    outline: "none",
    fontFamily: "Roboto",
    "&:hover, :active, :focus": {
      borderBottom: "2px solid",
      borderBottomColor: "primary.500",
    },
  },
  active: {
    px: 1,
    py: 1,
    color: "white ",
    fontWeight: "500",
    backgroundColor: "grey.900",
    border: "1px solid",
    borderColor: "grey.900",
    fontFamily: "Roboto",
    fontSize: "1.2rem",
    outline: 0,
    height: "3rem",
    // "&:hover, :active, :focus": {
    //   color: "grey.900",
    //   border: "1px solid",
    //   borderColor: "grey.900",
    //   backgroundColor: "transparent",
    // },
  },
  inActive: {
    px: 1,
    py: 1,
    color: "#252E40 !important",
    border: "1px solid",
    borderColor: "grey.900",
    backgroundColor: "transparent",
    fontWeight: "500",
    fontFamily: "Roboto",
    fontSize: "1.2rem",
    outline: 0,
    height: "3rem",
    // "&:hover, :active, :focus": {
    //   color: "white !important",
    //   border: "1px solid",
    //   borderColor: "grey.900",
    //   backgroundColor: "grey.900",
    // },
  },
};

export const Container = styled(Box)`
  cursor: pointer;
  position: relative;
  font-family: "SourceSansPro-Regular";
  white-space: nowrap;
  ${variant({
    variants,
  })}
  ${({ disabled }) =>
    disabled &&
    css({
      backgroundColor: "gray.500",
      boxShadow: "none",
      cursor: "not-allowed",
    })}
  ${({ whiteSpace }) =>
    whiteSpace &&
    css({
      whiteSpace,
    })}
  ${layout}
  ${color}
  ${typography}
  ${space}
  ${fontSize}
  ${border}
`;

export const Button = ({
  disabled,
  loading,
  children,
  textTransform,
  textVariant,
  variant: v = "primary",
  ...rest
}) => {
  return (
    <Container
      variant={v}
      as="button"
      color="white"
      {...rest}
      disabled={disabled || loading}
      overflow="hidden"
    >
      {/* {loading && (
        <Flex
          left={0}
          right={0}
          position="absolute"
          justifyContent="center"
          alignItems="center"
          fontSize={2}
          height="15px"
          width="15px"
          mx="auto"
        >
          <Loader loading={loading} />
        </Flex>
      )} */}
      <Flex>
        <Text
          color="inherit"
          variant={textVariant}
          textTransform={textTransform}
          opacity={loading ? 0 : 1}
        >
          {children}
        </Text>
      </Flex>
    </Container>
  );
};

Button.defaultProps = {
  textTransform: "uppercase",
  textVariant: "button",
};
