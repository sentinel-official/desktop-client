import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { Text, Box, Flex, Error, Grid, Button, Modal, ModalClose } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";

const initialValues = {
  address: "",
  amount: "",
  fee: "",
  password: "",
};
const validationSchemaSendToken = yup.object({
  address: yup.string().required("Required"),
  amount: yup.string().required("Required"),
});
const validationSchemaSendingTokenAddress = yup.object({
  fee: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export const SendTokenForm = () => {
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    toggle();
  };

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchemaSendToken}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <Box mx="3rem" mt="3rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  Deposit Address
                </Text>
                <FormInput type="text" name="address" label="Address" />
                <ErrorMessage name="address" component={Error} />
              </Box>
              <Box mx="3rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                >
                  Amount
                </Text>
                <FormInput
                  type="text"
                  name="amount"
                  label="Total Amount"
                  maxValue="Max"
                />
                <ErrorMessage name="amount" component={Error} />
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
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchemaSendingTokenAddress}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {() => {
              return (
                <Box mr="10rem" ml="1rem">
                  <Flex alignItems="center">
                    <Text
                      variant="title"
                      fontWeight="medium"
                      color="primary.700"
                      py="2rem"
                      mr="1rem"
                    >
                      SENDING TOKENS to
                    </Text>
                    <MemoHelp height="1.5rem" width="1.5rem" />
                  </Flex>
                  <Grid gridTemplateColumns="15rem 1fr">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                    >
                      To Address
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="grey.900"
                      pb="1rem"
                    >
                      cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj
                    </Text>
                  </Grid>
                  <Grid gridTemplateColumns="15rem 1fr">
                    <Text
                      variant="label"
                      fontWeight="medium"
                      color="grey.700"
                      textTransform="uppercase"
                    >
                      Tokens
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="grey.900"
                      m={0}
                      pb="1rem"
                    >
                      3,848,317
                    </Text>
                  </Grid>

                  <Form>
                    <Box my="2rem" mr="10rem">
                      <Box>
                        <Flex alignItems="center">
                          <Text
                            variant="label"
                            fontWeight="medium"
                            color="grey.700"
                            textTransform="uppercase"
                            mr="1rem"
                          >
                            FEE
                          </Text>
                          <MemoHelp height="1.5rem" width="1.5rem" />
                        </Flex>
                        <FormInput name="fee" label="Enter Fee" />
                        <ErrorMessage name="fee" component={Error} />
                      </Box>
                      <Box>
                        <Text
                          variant="label"
                          fontWeight="medium"
                          color="grey.700"
                          textTransform="uppercase"
                        >
                          PASSWORD
                        </Text>
                        <FormInput
                          type="password"
                          name="password"
                          label="Enter Password"
                        />
                        <ErrorMessage name="password" component={Error} />
                      </Box>
                      <Button px="8rem" justifySelf="center" type="submit">
                        SEND
                      </Button>
                    </Box>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
};
