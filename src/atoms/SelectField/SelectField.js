import React from "react";
import styled from "styled-components";
import ReactSelect, { components } from "react-select";

import { Box } from "atoms/Box";
import { Text } from "atoms/Text";
// import { Error } from "atoms/Error";
// import { Warning } from "atoms/Warning";

export const InputFieldBase = styled(Box)`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  margin: 0 0 25px 0;
  gap: 10px;
  padding: 6;
  border: "0px";
  background-color: "#E9F0F4 !important";
  outline: "none";
  font-weight: "400";
  border-radius: "none";
  &:focus,
  :active {
    background-color: "white";
  }
  &::placeholder {
    color: "gray.500";
    font-size: "14px";
  }
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
`;

const { ValueContainer, Placeholder } = components;

// const CustomValueContainer = ({ children, ...props }) => {
//   return (
//     <ValueContainer {...props}>
//       <Placeholder {...props} isFocused={props.isFocused}>
//         {props.selectProps.placeholder}
//       </Placeholder>
//       {React.Children.map(children, (child) =>
//         child && child.type !== Placeholder ? child : null
//       )}
//     </ValueContainer>
//   );
// };

export const SelectField = ({
  label,
  // error,
  // warning,

  searchable,
  ...props
}) => {
  return (
    <InputFieldBase>
      <Text as="label" color="gray.700" fontSize={{ xs: 7 }}>
        <ReactSelect
          placeholder={label}
          // components={{
          //   ValueContainer: CustomValueContainer,
          // }}
          styles={{
            control: (provided) => ({
              ...provided,
              height: 43,
              border: "none",
              backgroundColor: "#E9F0F4",
              borderRadius: "none",
              boxShadow: "none",
              fontSize: "14px",
              flexWrap: "nowrap",
              ...(searchable && { borderRadius: "100px", paddingLeft: "4rem" }),
            }),
            valueContainer: (provided) => ({
              ...provided,
              overflow: "visible",
            }),

            loadingIndicator: (provided) => ({
              ...provided,
              position: "relative",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: 0,
              paddingRight: "4px",
            }),
          }}
          {...props}
        />
        {/* {searchable && (
          <Box position="absolute" top="15px" left="23px">
            <MemoSearchIcon />
          </Box>
        )} */}
      </Text>
      {/* {error && <Error text={error} />}
      {warning && <Warning text={warning} />} */}
    </InputFieldBase>
  );
};
