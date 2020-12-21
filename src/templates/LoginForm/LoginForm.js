import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { Text, Box, Grid, Error, Button } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import { SocialSecion } from "molecules/SocialSecion";

import { LoginUserAction } from "../../pages/Login/actions/LoginActions";

const initialValues = {
  password: "",
};

const validationSchema = yup.object({
  password: yup.string().required("Required"),
});

export const LoginForm = () => {
  const [formValues, setFormValues] = useState(null);

  const dispatch = useDispatch();
  const loggedInUserDetails = useSelector((state) =>
    console.log("state ----", state)
  );

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    // submitProps.setSubmitting(false);
    // submitProps.resetForm();
    let payload = {
      password: values.password,
    };
    dispatch(LoginUserAction(payload));
  };

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
                  gridTemplateColumns="1fr 1.8fr 1fr"
                  justifyContent="space-between"
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
                      Authenticate Sentinel Client
                    </Text>

                    <Box mx="3rem" mt="5rem">
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
                      <ErrorMessage name="password" component={Error} />
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  borderTop="1px solid "
                  borderColor="border.0"
                  alignSelf="end"
                  alignItems="end"
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
                      <Button px="3rem" justifySelf="center" type="submit">
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
