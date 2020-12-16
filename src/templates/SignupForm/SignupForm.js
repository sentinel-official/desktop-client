import { Text, Box, Grid, Error } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FormInput } from "molecules/FormInput/FormInput";

const initialValues = {
  username: "",
  password: "",
  seed: "",
};
const validationSchema = Yup.object({});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("submitProps", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

export const SignupForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Grid
      gridTemplateColumns="1fr 1.5fr 1fr"
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
                Create Account
              </Text>
              <Box>
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  ACCOUNT NAME
                </Text>
                <FormInput name="name" label="Account Username" />
                <ErrorMessage name="name" component={Error} />
              </Box>
              <Box>
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  ACCOUNT PASSWORD
                </Text>
                <FormInput type="password" name="password" label="Password" />

                <ErrorMessage name="name" component={Error} />
              </Box>
              <Box bg="border.500" height="1px" width="100%" mb="2rem" />
              <Box>
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  Enter Seed
                </Text>
                <FormInput
                  as="textarea"
                  rows="4"
                  name="seed"
                  label="Enter Seed"
                  style={{ resize: "none" }}
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
