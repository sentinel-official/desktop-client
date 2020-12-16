import { Text, Box, Grid, Flex, Error, Button } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FormInput } from "molecules/FormInput/FormInput";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("submitProps", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

export const SendTokenForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Box px="3rem" mt="3rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                textTransform="uppercase"
              >
                Deposit Address
              </Text>
              <FormInput type="text" name="address" label="Address" />
              <ErrorMessage name="name" component={Error} />
            </Box>
            <Box px="3rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                textTransform="uppercase"
              >
                Amount
              </Text>
              <FormInput type="text" name="amount" label="Total Amount" />
              <ErrorMessage name="name" component={Error} />
            </Box>
            <Flex justifySelf="center">
              <Button px="3rem" m="auto" type="submit">
                Send
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
