import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Text, Box, Grid, Error, Button } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import { SocialSecion } from "molecules/SocialSecion";

import { LoginUserAction } from '../../pages/Login/actions/LoginActions';



const initialValues = {
  password: "",
};

const validationSchema = Yup.object({

});


export const LoginForm = () => {
  const [formValues, setFormValues] = useState(null);

  const dispatch = useDispatch();
  const loggedInUserDetails = useSelector((state) =>  console.log('state ----', state));

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    // submitProps.setSubmitting(false);
    // submitProps.resetForm();
    let payload = {
      "password": values.password
    }
    dispatch(LoginUserAction(payload));
  };

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
                  <Grid gridAutoFlow="column" gridGap="2rem" alignItems="center">
                    <Button px="3rem" justifySelf="center" type="submit">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <Box />
    </Grid>
  );
};
