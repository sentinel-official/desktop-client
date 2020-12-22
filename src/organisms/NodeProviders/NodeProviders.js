import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Grid, Text, Flex, Modal, Error, ModalClose, Button } from "atoms";
import { FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";
import MemoProfile from "assets/icons/Profile";
import MemoProvider from "assets/icons/Provider";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

const ConnectModal = ({ setConnect, visible, hide, toggle }) => {
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

const NodeHosterList = ({ setConnect }) => {
  const { visible, hide, toggle } = useVisibleState(false);

  return (
    <>
      <Grid
        py="1rem"
        pl="5rem"
        gridTemplateColumns="1fr  1fr 1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          50GB
          <Text
            as="span"
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            pl=".5rem"
          >
            / 15000SENT
          </Text>
        </Text>
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          542Mbps
        </Text>
        <Text
          as="span"
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
        >
          2 Months
        </Text>
        <Text
          color="primary.500"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
        >
          SUBSCRIBE
        </Text>
      </Grid>
      {visible && (
        <ConnectModal
          setConnect={setConnect}
          visible={visible}
          toggle={toggle}
          hide={hide}
        />
      )}
    </>
  );
};

const NodeHosterDetail = ({ connect, setConnect }) => {
  return (
    <>
      <Grid
        py="1rem"
        pl="5rem"
        gridTemplateColumns="1fr  1fr 1fr 1fr "
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          PLAN
        </Text>

        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          BANDWIDTH
        </Text>

        <Text as="span" color="text.500" fontSize="1.4rem" fontWeight="medium">
          VALIDITY
        </Text>

        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          NODES
        </Text>
      </Grid>
      <Grid gridGap="1rem">
        {[1, 2, 3].map((index) => (
          <NodeHosterList
            key={index}
            connect={connect}
            setConnect={setConnect}
          />
        ))}
      </Grid>
    </>
  );
};

const NodeProvidersList = ({ connect, setConnect, visibleListView }) => {
  const { visible, toggle } = useVisibleState(true);
  return (
    <>
      <Grid
        py="1.5rem"
        gridTemplateColumns="1fr  1fr 1fr 1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Flex alignItems="center">
          <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
            ABC Node Hosters
          </Text>
        </Flex>

        <Text color="primary.700" fontSize="1.4rem">
          3
        </Text>
        <Flex alignItems="center">
          <Box
            height=".5rem"
            width=".5rem"
            bg="green.500"
            borderRadius=".5rem"
          />
          <Text as="span" color="primary.700" fontSize="1.4rem" ml=".5rem">
            24
          </Text>
        </Flex>

        <Text color="primary.700" fontSize="1.4rem"></Text>

        <Text
          color="grey.700"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
        >
          {visible ? "View" : "Close"}
        </Text>
      </Grid>
      {!visible && (
        <NodeHosterDetail connect={connect} setConnect={setConnect} />
      )}
    </>
  );
};

const MapViewNodeProviderList = ({ setConnect }) => {
  const { visible, toggle, show, hide } = useVisibleState(false);
  return (
    <>
      <Grid>
        <Grid
          py="1rem"
          gridTemplateColumns="1fr  1fr 1fr 1.5fr"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="border.500"
        >
          <Flex alignItems="center">
            <MemoProfile height="2rem" width="2rem" />
            <Box pl="2rem">
              <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
                Germany01
              </Text>
              <Text
                color="primary.700"
                fontSize="1.4rem"
                fontWeight="medium"
                pt="1rem"
              >
                542.45 Mbps
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
              50GB
              <Text
                as="span"
                color="primary.700"
                fontSize="1.4rem"
                fontWeight="medium"
                pl=".5rem"
              >
                / 15000SENT
              </Text>
            </Text>
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              pt="1rem"
            >
              2 Months
            </Text>
          </Box>

          <Box textAlign="center">
            <MemoProvider m="auto" />
            <Text color="primary.700" fontSize="1.4rem" ml=".5rem">
              ABC Node Hosters
            </Text>
          </Box>
          <Box textAlign="right">
            <Button variant="primary" px="3rem" mx="2rem" onClick={show}>
              CONNECT
            </Button>
          </Box>
        </Grid>
      </Grid>
      {visible && (
        <ConnectModal
          setConnect={setConnect}
          visible={visible}
          toggle={toggle}
          show={show}
          hide={hide}
        />
      )}
    </>
  );
};

const NodeProvidersConnectedList = ({ connect, setConnect }) => {
  const { visible, toggle } = useVisibleState(true);
  return (
    <>
      <Grid
        py="1.5rem"
        gridTemplateColumns="1fr  1fr 1fr 1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Flex alignItems="center">
          <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
            ABC Node Hosters
          </Text>
        </Flex>

        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          50GB
          <Text
            as="span"
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            pl=".5rem"
          >
            / 15000SENT
          </Text>
        </Text>

        <Text color="primary.700" fontSize="1.4rem" ml=".5rem">
          2 Months
        </Text>

        <Text color="primary.700" fontSize="1.4rem">
          5
        </Text>

        <Text
          color="grey.700"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
        >
          {visible ? "View" : "Close"}
        </Text>
      </Grid>
      {!visible && (
        <NodeHosterDetail connect={connect} setConnect={setConnect} />
      )}
    </>
  );
};

export const NodeProviders = ({ connect, setConnect, visibleListView }) => {
  return (
    <>
      {visibleListView ? (
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
                PLAN
              </Text>
            </Box>

            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect ? "ACTIVE NODES" : "VALIDITY"}
              </Text>
            </Box>

            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect && "NODES"}
              </Text>
            </Box>
            <Box py={4}>
              <Text
                color="text.500"
                fontWeight="medium"
                fontSize="1.3rem"
                textTransform="uppercase"
              >
                {connect && "VIEW NODES"}
              </Text>
            </Box>
          </Grid>

          <Grid>
            {!connect ? (
              <Box>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <NodeProvidersList
                    connect={connect}
                    setConnect={setConnect}
                    key={index}
                  />
                ))}
              </Box>
            ) : (
              <Box>
                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <NodeProvidersConnectedList
                    connect={connect}
                    setConnect={setConnect}
                    key={index}
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Box>
      ) : (
        <>
          <Box
            mt="3rem"
            border="1px solid "
            borderColor="border.500"
            height="50vh"
          >
            MAP
          </Box>
          <Box mt="2rem" height="20vh" overflowY="scroll">
            {[1, 2, 3].map((index) => (
              <MapViewNodeProviderList
                connect={connect}
                setConnect={setConnect}
                visibleListView={visibleListView}
                key={index}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};
