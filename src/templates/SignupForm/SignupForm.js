import { Text, Box, Grid, Error, Button } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { FormInput } from "molecules/FormInput/FormInput";
import { SocialSecion } from "molecules/SocialSecion";

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
    <Box>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Grid gridTemplateRows="94vh 6vh">
                <Grid
                  gridTemplateColumns="1fr 1.5fr 1fr"
                  gridGap="5rem"
                  alignItems="center"
                >
                  <Box />
                  <Box>
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
                      <FormInput
                        type="password"
                        name="password"
                        label="Password"
                      />

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
                  </Box>
                </Grid>
                <Box
                  borderTop="1px solid "
                  borderColor="border.0"
                  alignSelf="end"
                  p="1rem 2rem "
                >
                  <Grid
                    gridAutoFlow="column"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <SocialSecion />
                    <Grid
                      gridAutoFlow="column"
                      gridGap="2rem"
                      alignItems="center"
                    >
                      <Text variant="field" color="grey.700">
                        Agree with{" "}
                        <Text
                          as="span"
                          variant="field"
                          color="primary.500"
                          textDecoration="underline"
                          cursor="pointer"
                        >
                          Terms & Conditions
                        </Text>
                      </Text>
                      <Link to="/account-created">
                        <Button px="3rem" justifySelf="center" type="submit">
                          Create
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
