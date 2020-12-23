import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Grid, Text, Flex, Modal, Error, ModalClose, Button } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import MemoHelp from "assets/icons/Help";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

export const ConnectModal = ({ setConnect, visible, hide, toggle }) => {
  const [formValues, setFormValues] = useState(null);

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
    toggle();
    setConnect(true);
  };

  return (
    <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
      <ModalClose onClick={hide} />
      <Grid gridTemplateColumns="35rem 20rem">
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
                    <Button px="3rem" justifySelf="center" type="submit">
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
  );
};
