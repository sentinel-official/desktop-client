import { useState } from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  Box,
  Grid,
  Text,
  Flex,
  CustomNavLink,
  Button,
  Modal,
  Error,
  ModalClose,
  Chip,
} from "atoms";
import { FormInput } from "molecules/FormInput";
import MemoProfile from "assets/icons/Profile";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import MemoLock from "assets/icons/Lock";
import MemoWallet from "assets/icons/Wallet";
import MemoActiveBorder from "assets/icons/ActiveBorder";
import MemoArrowLeft from "assets/icons/ArrowLeft";
import MemoArrowRight from "assets/icons/ArrowRight";
import useVisibleState from "hooks/useVisibleStates";
import { DropdownFilter } from "molecules/DropdownFilter";
import MemoSetting from "assets/icons/Setting";
import MemoHelp from "assets/icons/Help";
import { ConnectionStatus } from "molecules/ConnectionStatus";
import MemoLogo from "assets/icons/Logo";
import { ConfigureSettingForm } from "templates/ConfigureSettingForm";

const sidebarLinks = [
  { Icon: MemoLock, name: "dVPN", url: "/dashboard/dVPN" },
  { Icon: MemoWallet, name: "Wallet", url: "/dashboard/wallet" },
];

const BoxStyle = styled(Box)`
  &:hover,
  :focus,
  :active {
    background-color: #129eed;
    color: white;
    svg path {
      color: white;
      fill: white !important;
    }
  }
`;

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
const DropdownItem = ({ name }) => {
  return (
    <BoxStyle px="1.5rem" py="1rem" cursor="pointer">
      <Text width="100%" fontSize="1.4rem" fontWeight="medium">
        {name}
      </Text>
    </BoxStyle>
  );
};

export const MyAccountDropdown = ({ name }) => {
  const [dropdown, setDropdown] = useState(false);
  const { visible, hide, toggle } = useVisibleState(false);

  const openSettingHandler = () => {
    setDropdown(false);
    toggle();
  };
  return (
    <>
      <DropdownFilter
        render={
          <Grid width="15rem">
            <DropdownItem name="ACCOUNT 01" />
            <DropdownItem name="ACCOUNT 02" />
            <DropdownItem name="ACCOUNT 03" />
            <DropdownItem name="ACCOUNT 04" />
            <DropdownItem name="ACCOUNT 05" />
            <BoxStyle px="1.5rem" py="1rem" cursor="pointer" color="grey.700">
              <Grid
                gridAutoFlow="column"
                justifyContent="start"
                alignItems="center"
                gridGap=".5rem"
                onClick={openSettingHandler}
              >
                <MemoSetting height="1.8rem" width="1.8rem" fill="#8EA1C8" />
                <Text width="100%" fontSize="1.4rem" fontWeight="medium">
                  SETTINGS
                </Text>
              </Grid>
            </BoxStyle>
          </Grid>
        }
        onClose={() => setDropdown(false)}
        open={dropdown}
        onOpen={() => setDropdown(true)}
      >
        <Flex alignItems="center" py="1rem">
          <Grid
            gridAutoFlow="column"
            alignItems="center"
            justifyContent="center"
          >
            <MemoProfile height="2rem" width="2rem" />
            <Flex
              opacity={name ? 1 : 0}
              transition="all 1s"
              alignItems="center"
            >
              {name && (
                <>
                  <Text
                    fontWeight="medium"
                    variant="field"
                    color="primary.700"
                    whiteSpace="nowrap"
                    mx="1rem"
                  >
                    {name}
                  </Text>
                  <MemoArrowBottom height=".8rem" width="1rem" />
                </>
              )}
            </Flex>
          </Grid>
        </Flex>
      </DropdownFilter>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />
          <Grid gridTemplateColumns="auto auto">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <Grid
                      gridTemplateColumns="auto"
                      gridGap="5rem"
                      alignItems="center"
                      px="4rem"
                    >
                      <Box mb="4rem">
                        <Text
                          as="h3"
                          variant="heading3"
                          color="primary.700"
                          textAlign="center"
                        >
                          Configure Settings
                        </Text>
                        <Grid gridTemplateColumns="1fr 1fr" gridGap="3rem">
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
                              <ErrorMessage
                                name="gas_amount"
                                component={Error}
                              />
                            </Box>
                          </Box>
                          <Box mt="5rem">
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
                              <FormInput
                                name="rpc_address"
                                label="RPC Address"
                              />
                              <ErrorMessage
                                name="rpc_address"
                                component={Error}
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Button px="8rem" justifySelf="center" type="submit">
                          SAVE
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Box />
          </Grid>
        </Modal>
      )}
    </>
  );
};

export const Sidebar = ({ connect }) => {
  const { visible, toggle } = useVisibleState(true);
  return (
    <Box
      bg="primary.600"
      height="100vh"
      textAlign="center"
      width={visible ? "17vw" : "8rem"}
      transition="all 0.3s"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bg="primary.500"
        borderRadius="3rem"
        height="3rem"
        width="3rem"
        zIndex={2}
        right="-1.5rem"
        top="1.5rem"
        cursor="pointer"
        onClick={toggle}
      >
        {visible ? (
          <MemoArrowLeft height="1rem" fill="white" />
        ) : (
          <MemoArrowRight height="1rem" fill="white" />
        )}
      </Flex>
      <Box bg="white" p="2rem">
        <Grid gridAutoFlow="column" justifyContent="center" alignItems="center">
          <MyAccountDropdown name={visible ? "Barry Allen" : undefined} />
        </Grid>
      </Box>
      <Box>
        {sidebarLinks.map(({ Icon, name, url }) => (
          <CustomNavLink to={url}>
            {(isActive) => (
              <Grid
                gridTemplateColumns={visible ? "5rem 1fr" : "3rem 1fr"}
                alignItems="center"
              >
                {isActive ? (
                  <MemoActiveBorder
                    height="4.3rem"
                    width=".5rem"
                    alignSelf="start"
                  />
                ) : (
                  <Box width=".5rem" />
                )}
                <Flex alignItems="center" py="2rem">
                  <Icon
                    height="2rem"
                    width="2rem"
                    fill={isActive ? "white" : "#55678B"}
                  />
                  {visible && (
                    <Text
                      variant="field"
                      fontWeight="medium"
                      color={isActive ? "white" : "#55678B"}
                      px="2rem"
                    >
                      {name}
                    </Text>
                  )}
                </Flex>
              </Grid>
            )}
          </CustomNavLink>
        ))}
      </Box>
      {connect && visible && window.location.pathname === "/dashboard/dVPN" ? (
        <ConnectionStatus />
      ) : (
        <Box position="absolute" bottom="2rem" m="auto" left={0} right={0}>
          <MemoLogo height="4rem" />
        </Box>
      )}
    </Box>
  );
};
