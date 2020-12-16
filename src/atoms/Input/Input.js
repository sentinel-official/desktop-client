import React, { forwardRef, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import mergeRefs from "../../utils/mergeRefs";
import {
  space,
  layout,
  color,
  position,
  border,
  shadow,
  typography,
  variant,
} from "styled-system";

export const InputBase = styled.input`
  width: 100%;
  ${variant({
    variants: {
      primary: {
        p: 6,
        border: "0px",
        backgroundColor: "#E9F0F4 !important",
        outline: "none",
        fontWeight: "400",
        "&:focus, &:active": {
          bg: "white.0",
        },
        "&::placeholder": {
          color: "gray.500",
        },
      },

      error: {
        display: "block",
        color: "red",
        border: "none",
        borderBottom: "1px solid",
        borderColor: "gray.500",
      },
    },
  })};

  ${space}
  ${layout}
  ${color}
  ${position}
  ${border}
  ${shadow}
  ${typography}
`;

export const Input = forwardRef(
  ({ autoFocus, variant: v = "primary", type, onChange, ...props }, ref) => {
    const inputRef = useRef(null);

    // const [isOpen, setOpen] = useState(false);
    // const [toggleVisible, setToggleVisible] = useState(false);

    // const toggle = useCallback(() => setOpen((prev) => !prev), []);

    const isPassword = useMemo(() => type === "password", [type]);

    const onChangeHandler = useCallback(
      (e) => {
        if (typeof onChange === "function") {
          onChange(e);
        }
        // setToggleVisible(e?.currentTarget?.value?.length > 0);
      },
      [onChange]
    );

    return (
      <>
        {/* {isPassword && toggleVisible && (
          <Flex
            onClick={toggle}
            position="absolute"
            top={0}
            right={0}
            cursor="pointer"
            alignItems="center"
            height="100%"
            width="4.5rem"
            justifyContent="center"
          >
            <Text firstLetterCapital>{isOpen ? "hide" : "show"}</Text>
          </Flex>
        )} */}
        <InputBase
          type={type}
          variant={v}
          ref={mergeRefs(ref, inputRef)}
          fontFamily="Roboto"
          onChange={onChangeHandler}
          {...props}
          pr={isPassword ? "4.5rem" : undefined}
        />
      </>
    );
  }
);
