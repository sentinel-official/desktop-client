import React from "react";
import { useField } from "formik";
import { InputField } from "atoms/InputField";
import { SelectField } from "atoms/SelectField";

export const FormInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const error = (meta.touched && meta.error) || "";
  return <InputField {...field} {...props} error={error} />;
};

export const FormSelect = ({ name, options, ...props }) => {
  const [field, meta, { setValue }] = useField(name);
  const error = (meta.touched && meta.error) || "";

  return (
    <SelectField
      {...field}
      value={
        Array.isArray(field.value)
          ? options?.filter((o) => field.value.includes(o.value))
          : // eslint-disable-next-line eqeqeq
            options?.find((o) => o.value == field.value) || field.value
      }
      {...props}
      onChange={(option) => {
        setValue(
          Array.isArray(option) ? option?.map((o) => o?.value) : option?.value
        );
        if (props.onChange) {
          props.onChange(
            Array.isArray(option) ? option?.map((o) => o?.value) : option?.value
          );
        }
      }}
      options={options}
      error={error}
    />
  );
};
