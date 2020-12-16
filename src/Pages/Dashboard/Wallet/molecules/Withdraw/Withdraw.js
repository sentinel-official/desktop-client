import { Box, Text, Flex, Button } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FormSelect } from "molecules/FormInput/FormInput";

const initialValues = {
  validator: "",
};
const validationSchema = Yup.object({});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("submitProps", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const WithdrawForm = () => {
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
            <Box px="3rem" mt="2rem">
              <Text
                variant="label"
                fontWeight="medium"
                color="grey.700"
                textTransform="uppercase"
              >
                SELECT VALIDATOR TO WITHDRAW
              </Text>

              <FormSelect name="validator" option={[]} />
              <ErrorMessage name="name" component={Error} />
            </Box>
            <Flex justifySelf="center">
              <Button px="3rem" m="auto" type="submit">
                Withdraw
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export const Withdraw = () => {
  return (
    <Box mt="3rem">
      <Text
        variant="field"
        fontWeight="medium"
        color="primary.700"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="border.500"
        textAlign="center"
        py="1rem"
      >
        Withdraw
      </Text>
      <WithdrawForm />
    </Box>
  );
};
