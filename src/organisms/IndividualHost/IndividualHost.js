import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Grid, Text, Flex, Modal, Error, ModalClose, Button } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";
import MemoProfile from "assets/icons/Profile";
import MemoSort from "assets/icons/Sort";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

const IndividualHostList = ({ connect, setConnect }) => {
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    hide();
    setConnect(true);
  };
  return (
    <>
      <Grid
        py="1.5rem"
        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          Provider AG
        </Text>

        <Flex alignItems="center">
          <MemoProfile height="2rem" width="2rem" />
          <Text
            as="span"
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            ml=".5rem"
          >
            United States
          </Text>
        </Flex>

        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          542.45 Mbps
        </Text>
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          750
        </Text>

        <Text
          color="primary.500"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          textTransform="uppercase"
          onClick={toggle}
        >
          Connect
        </Text>
      </Grid>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Grid gridTemplateColumns="35rem 25rem">
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Box>
                    <Flex alignItems="center">
                      <Text
                        variant="title"
                        fontWeight="medium"
                        color="primary.700"
                        p="1rem"
                      >
                        Subscribe to Connect
                      </Text>
                      <MemoHelp height="1.5rem" width="1.5rem" />
                    </Flex>

                    <Form>
                      <Box my="3rem" mx="1rem">
                        <Text
                          variant="label"
                          fontWeight="medium"
                          color="grey.700"
                          textTransform="uppercase"
                        >
                          Node Address
                        </Text>
                        <Text
                          variant="body"
                          fontWeight="medium"
                          color="primary.700"
                          pt="1rem"
                        >
                          cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj
                        </Text>
                        <Box mt="3rem">
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
                        <Button px="5rem" justifySelf="center" type="submit">
                          Connect
                        </Button>
                      </Box>
                    </Form>
                  </Box>
                );
              }}
            </Formik>
          </Grid>
        </Modal>
      )}
    </>
  );
};

export const IndividualHost = ({ connect, setConnect }) => {
  return (
    <Box mr="1rem">
      <Grid
        pt="2rem"
        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr "
        borderBottom="1px solid"
        borderColor="border.500"
      >
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
            LOCATION
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            BANDWIDTH
          </Text>
        </Box>

        <Box py={4}>
          <Flex alignItems="center">
            <Text
              color="text.500"
              fontWeight="medium"
              fontSize="1.3rem"
              textTransform="uppercase"
              pr=".5rem"
            >
              SENT/GB
            </Text>
            <MemoSort height="1rem" />
          </Flex>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            CONNECT
          </Text>
        </Box>
      </Grid>

      <Grid>
        {[1, 2, 3, 4, 5].map((index) => (
          <IndividualHostList
            key={index}
            connect={connect}
            setConnect={setConnect}
          />
        ))}
      </Grid>
    </Box>
  );
};
