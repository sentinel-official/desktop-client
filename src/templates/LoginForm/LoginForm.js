import { Text, Box, Grid, Error } from "atoms";
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

export const LoginForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Grid
      gridTemplateColumns="1fr 1.8fr 1fr"
      gridGap="5rem"
      alignItems="center"
    >
      <Box />

      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Text
                as="h3"
                variant="heading3"
                color="primary.700"
                textAlign="center"
              >
                Authenticate Sentinel Client
              </Text>

              <Box px="3rem" mt="5rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  ACCOUNT PASSWORD
                </Text>
                <FormInput
                  type="password"
                  name="password"
                  label="Enter Password"
                />
                <ErrorMessage name="name" component={Error} />
              </Box>
            </Form>
          );
        }}
      </Formik>
      <Box />
    </Grid>
  );
};
