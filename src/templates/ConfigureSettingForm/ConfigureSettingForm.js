import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { Text, Box, Grid, Flex, Error, Button, Chip } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";
import { SocialSecion } from "molecules/SocialSecion";

const initialValues = {
  fee: "",
  gas_amount: "",
  chain_id: "",
  rpc_address: "",
};
const validationSchema = Yup.object({
  fee: Yup.string().required("Required"),
  gas_amount: Yup.string().required("Required"),
  chain_id: Yup.string().required("Required"),
  rpc_address: Yup.string().required("Required"),
});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("submitProps", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

export const ConfigureSettingForm = () => {
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
                  gridTemplateColumns="8rem 4fr 8rem"
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
                        <Box>
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
                          <ErrorMessage name="fee" component={Error} />
                        </Box>
                        <Box>
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
                          <FormInput
                            name="gas_amount"
                            label="Enter Gas Amount"
                          />
                          <ErrorMessage name="gas_amount" component={Error} />
                        </Box>
                      </Box>
                      <Box px="3rem" mt="5rem">
                        <Box>
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
                          <ErrorMessage name="chain_id" component={Error} />
                        </Box>

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
                        <Box>
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
                          <ErrorMessage name="rpc_address" component={Error} />
                        </Box>
                      </Box>
                    </Grid>
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
                      {/* <Link to="/dashboard/wallet"> */}
                      <Button px="3rem" justifySelf="center" type="submit">
                        Save
                      </Button>
                      {/* </Link> */}
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
