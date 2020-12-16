import React, { useRef } from "react";
import styled from "styled-components";

import { Box } from "../Box";
// import { Text } from "../Text";
// import { Error } from "../Error";
// import { Warning } from "../Warning";
import { Input } from "../Input";

export const InputFieldBase = styled(Box)`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  margin: 5px 0 25px 0;
  gap: 10px;
`;

export const InputField = ({
  label,
  error,
  warning,
  labelHide,
  showLength,
  ...props
}) => {
  const ref = useRef(null);

  return (
    <InputFieldBase labelHide={labelHide}>
      {/* <Text
        as="label"
        // color="red"
        // className={error ? "input-error" : ""}
        fontSize={{ xs: 7 }}
      > */}
      <Input placeholder={label} ref={ref} {...props} />
      {/* </Text> */}
      {/* {showLength && (
        <Text
          fontSize="1.2rem"
          position="absolute"
          bg="white"
          fontWeight="300"
          color="gray.700"
          right="0.7rem"
          bottom="1rem"
        >
          {ref?.current?.value?.length || 0} / {props.maxLength}
        </Text>
      )} */}
      {/* {error && <Error text={error} />}
      {warning && <Warning text={warning} />} */}
    </InputFieldBase>
  );
};
