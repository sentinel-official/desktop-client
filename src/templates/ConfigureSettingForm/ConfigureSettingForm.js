import { Text, Box, Grid, Flex, Error } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";
import { Chip } from "../../atoms/Chip";

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

export const ConfigureSettingForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Grid
      gridTemplateColumns="8rem 4fr 8rem"
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
                Configure Settings
              </Text>
              <Grid gridTemplateColumns="1fr 1fr">
                <Box mt="5rem">
                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      Broadcast mode
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <Grid
                    gridAutoFlow="column"
                    justifyContent="start"
                    gridGap="1rem"
                    mb="2rem"
                  >
                    <Chip variant="selected" text="Block" />
                    <Chip variant="primary" text="Sync" />
                    <Chip variant="primary" text="Async" />
                  </Grid>

                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      Fee
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <FormInput name="fee" label="Enter Fee" />
                  <ErrorMessage name="name" component={Error} />

                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      Gas
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <FormInput name="gas" label="Enter Gas Amount" />
                  <ErrorMessage name="name" component={Error} />
                </Box>
                <Box px="3rem" mt="5rem">
                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      Chain ID
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <FormInput name="chain_id" label="Chain Id" />
                  <ErrorMessage name="name" component={Error} />

                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      Trust RPC Server
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <Grid
                    gridAutoFlow="column"
                    gridGap="1rem"
                    mb="2rem"
                    justifyContent="start"
                  >
                    <Chip variant="selected" text="Yes" />
                    <Chip variant="primary" text="No" />
                  </Grid>

                  <Flex alignItems="center" mb="1rem">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                      mr=".5rem"
                    >
                      RPC Server Address
                    </Text>
                    <MemoHelp height="1.3rem" width="1.3rem" />
                  </Flex>
                  <FormInput name="rpc_address" label="RPC Address" />
                  <ErrorMessage name="name" component={Error} />
                </Box>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Box />
    </Grid>
  );
};
