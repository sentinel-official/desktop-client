import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MemoProfile from "assets/icons/Profile";
import { Box, Grid, Text, Flex, Modal, Error, ModalClose, Button } from "atoms";
import { useState } from "react";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";
import { FormInput } from "molecules/FormInput";
import MemoCheck from "assets/icons/Check";

const initialValues = {
  amount: "",
  password: "",
};
const validationSchema = Yup.object({
  amount: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const ValidatorsList = ({ index }) => {
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);
  const [delegate, setDelegate] = useState(false);

  const delegatehandler = () => {
    setDelegate(true);
  };
  const onCloseDelegate = () => {
    hide();
    setDelegate(false);
  };

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    delegatehandler();
  };
  return (
    <>
      <Grid
        py="1rem"
        gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr"
        alignItems="center"
        borderBottom={index < 3 ? "1px solid" : "none"}
        borderColor="border.500"
      >
        <Flex alignItems="center">
          <MemoProfile height="2.5rem" width="2.5rem" />
          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            ml="1rem"
          >
            Forbole
          </Text>
        </Flex>

        <Text color="primary.700" fontSize="1.4rem">
          1,190,255 (6.62%)
        </Text>
        <Text color="primary.700" fontSize="1.4rem">
          94.04%
        </Text>
        <Text color="primary.700" fontSize="1.4rem">
          10.00%
        </Text>
        <Text color="primary.700" fontSize="1.4rem">
          100.00%
        </Text>
        <Text
          color="primary.500"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
        >
          DELEGATE
        </Text>
      </Grid>
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
                <Box>
                  <Flex alignItems="center" ml="2rem">
                    <Text
                      variant="title"
                      fontWeight="medium"
                      color="primary.700"
                      py="2rem"
                      mr="1rem"
                    >
                      DELEGATING to
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
                  {!delegate ? (
                    <Box mr="10rem" ml="2rem">
                      <Grid gridTemplateColumns="15rem 1fr">
                        <Text
                          variant="label"
                          fontWeight="medium"
                          color="grey.700"
                          textTransform="uppercase"
                        >
                          Operator Address
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
                          Commision Rate
                        </Text>
                        <Text
                          variant="body"
                          fontWeight="medium"
                          color="grey.900"
                          m={0}
                          pb="1rem"
                        >
                          9.50% (Updated a month ago)
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
                                amount
                              </Text>
                              <MemoHelp height="1.5rem" width="1.5rem" />
                            </Flex>
                            <FormInput name="amount" label="Total Amount" />
                            <ErrorMessage name="amount" component={Error} />
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
                          <Button
                            px="8rem"
                            justifySelf="center"
                            type="submit"
                            // onClick={delegatehandler}
                          >
                            DELEGATE
                          </Button>
                        </Box>
                      </Form>
                    </Box>
                  ) : (
                    <Box m="5rem">
                      <Grid justifyContent="center" alignItems="center">
                        <Flex
                          height="10rem"
                          width="10rem"
                          borderRadius="5rem"
                          border="5px solid"
                          borderColor="green.500"
                          mx="auto"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <MemoCheck height="5rem" width="5rem" />
                        </Flex>
                        <Text
                          variant="label"
                          fontWeight="semiBold"
                          color="grey.700"
                          textAlign="center"
                          mt="3rem"
                        >
                          Tx#:
                          <Text as="span" variant="field" color="grey.900">
                            6E13234324445405392DBA064184D589A7DBD45E0F9325D141F8C8D0
                          </Text>
                        </Text>
                        <Text
                          variant="label"
                          fontWeight="semiBold"
                          color="grey.700"
                          textAlign="center"
                          my="2rem"
                        >
                          Go to Explorer
                        </Text>
                        <Button
                          variant="secondary"
                          px="3rem"
                          justifySelf="center"
                          onClick={onCloseDelegate}
                        >
                          Close
                        </Button>
                      </Grid>
                    </Box>
                  )}
                </Box>
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export const Validators = () => {
  return (
    <Box mr="1rem">
      <Grid py="1.5rem" gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr">
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            MONIKER
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            VOTING POWER
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            SELF
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            COMMISSION
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            UPTIME
          </Text>
        </Box>
        <Box py={4} />
      </Grid>

      <Grid gridGap="1rem">
        {[1, 2, 3].map((index) => (
          <ValidatorsList key={index} index={index} />
        ))}
      </Grid>
    </Box>
  );
};
