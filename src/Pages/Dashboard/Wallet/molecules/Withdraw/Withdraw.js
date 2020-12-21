import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Text, Flex, Grid, Button, Modal, ModalClose } from "atoms";
import { FormSelect, FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";

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
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);
  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <Box px="3rem" mt="2rem">
                <Text
                  variant="label"
                  fontWeight="medium"
                  color="grey.700"
                  textTransform="uppercase"
                  pb=".8rem"
                >
                  SELECT VALIDATOR TO WITHDRAW
                </Text>

                <FormSelect name="validator" option={[]} />
                <ErrorMessage name="name" component={Error} />
              </Box>
              <Flex justifySelf="center">
                <Button px="3rem" m="auto" type="submit" onClick={toggle}>
                  Withdraw
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
            validationSchema={validationSchema}
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
                      WITHDRAWING FROM
                    </Text>
                    <Text
                      variant="body"
                      fontWeight="medium"
                      color="primary.500"
                      mr="1rem"
                    >
                      Forbole
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
                      FROM Address
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
                      8,317
                    </Text>
                  </Grid>

                  <Form>
                    <Box my="2rem" mr="10rem">
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
                      <Button px="8rem" justifySelf="center" type="submit">
                        WITHDRAW
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
