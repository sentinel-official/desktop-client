import { useState } from "react";
import { Box, Grid, Text, Flex, Button, Modal, Error, ModalClose } from "atoms";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FormInput } from "molecules/FormInput/FormInput";
import useVisibleState from "hooks/useVisibleStates";
import MemoHelp from "assets/icons/Help";

const initialValues = {
  password: "",
};
const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("submitProps", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const DetailsCommonComponent = ({ text, textValue }) => {
  return (
    <Grid gridTemplateColumns="15rem 1fr" pb="2rem">
      <Text
        color="text.500"
        fontSize="1.1rem"
        fontWeight="medium"
        textDecoration="none"
        lineHeight="100%"
      >
        {text}
      </Text>
      <Text
        color="primary.700"
        fontSize="1.2rem"
        fontWeight="semiBold"
        textDecoration="none"
        lineHeight="100%"
      >
        {textValue}
      </Text>
    </Grid>
  );
};

const ProposalDetails = () => {
  const { visible, hide, toggle } = useVisibleState(false);
  const [formValues, setFormValues] = useState(null);
  return (
    <Box py="2rem">
      <DetailsCommonComponent
        text="Initial Deposit"
        textValue="512.000000ATOM"
      />
      <DetailsCommonComponent text="Total Deposit" textValue="512.000000ATOM" />
      <DetailsCommonComponent text="Type" textValue="cosmos-sdk/TextProposal" />
      <DetailsCommonComponent
        text="Deposit End Time"
        textValue="2020-09-09 12:17:46"
      />
      <DetailsCommonComponent
        text="Submit Time"
        textValue="2020-09-09 12:17:46"
      />
      <Box>
        <Text
          color="text.500"
          fontSize="1.1rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
        >
          Description:
        </Text>
        <Text
          color="primary.700"
          fontSize="1.2rem"
          fontWeight="semiBold"
          textDecoration="none"
          lineHeight="1.8rem"
          mt="1rem"
        >
          The purpose of this proposal is to restore access to geneis ATOMs for
          a subset of donors who have been active participants in our community
          through the last year. The view of iqlusion is that this is an
          important moment for the Cosmos Hub. Stargate brings the fundraiser
          period to the end with delivery of IBC. This proposal resolves the
          open business of active members of our community who cannot access
          their ATOM. This is an opportunity is opporunity to bring this
          business to a close and setup the agenda for IBC powered innovation
          comming in 2021.We strongly encourage the Cosmos Community to verify
          the cryptographic evidence and bring these community members to full
          ATOM holder status.
        </Text>
      </Box>
      <Grid
        gridAutoFlow="column"
        justifyContent="center"
        gridGap="1rem"
        mt="2rem"
      >
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={toggle}
        >
          Yes
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
        >
          No
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
        >
          Abstain
        </Button>
        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
        >
          NoWithVeto
        </Button>
        <Button
          variant="normal"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
        >
          Cancel
        </Button>
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
                  <Flex alignItems="center">
                    <Text
                      variant="field"
                      fontWeight="medium"
                      color="primary.700"
                      p="1rem"
                    >
                      Voting YES
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
                        PASSWORD
                      </Text>
                      <FormInput
                        type="password"
                        name="password"
                        label="Enter Password"
                      />
                      <ErrorMessage name="password" component={Error} />
                      <Button px="3rem" justifySelf="center" type="submit">
                        CONFIRM VOTE
                      </Button>
                    </Box>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Modal>
      )}
    </Box>
  );
};
const ProposalsList = ({ index }) => {
  const { visible, toggle } = useVisibleState(true);

  return (
    <Box p="1.5rem 2rem" border="1px solid" borderColor="border.500" mr="1rem">
      <Flex alignItems="center">
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="bg.600"
          borderRadius="4rem"
          height="4rem"
          width="4rem"
        >
          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            textDecoration="none"
            lineHeight="100%"
          >
            # {index}
          </Text>
        </Flex>
        <Text
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          ml="1rem"
        >
          Genesis fund recovery proposal on behalf of fundraiser participants
          unable to access their ATOMs
        </Text>
      </Flex>
      <Grid
        py="1rem"
        gridTemplateColumns="1fr 1.5fr 1.5fr 1fr 1fr "
        alignItems="center"
        borderColor="border.500"
      >
        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Proposer
            </Text>
            <Text
              color="primary.500"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              iqlusion
            </Text>
          </Grid>
        </Flex>

        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Voting Start
            </Text>
            <Text
              color="primary.700"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              2020-09-09 12:17:46
            </Text>
          </Grid>
        </Flex>
        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Voting End
            </Text>
            <Text
              color="primary.700"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              2020-09-09 12:17:46
            </Text>
          </Grid>
        </Flex>

        <Flex alignItems="center">
          <Grid gridGap="1rem">
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              textDecoration="none"
              lineHeight="100%"
            >
              Most Voted On
            </Text>
            <Text
              color="green.500"
              fontSize="1.4rem"
              fontWeight="semiBold"
              textDecoration="none"
              lineHeight="100%"
            >
              Yes 68.76%
            </Text>
          </Grid>
        </Flex>

        <Button
          variant="greyBorder"
          textVariant="label"
          px="2rem"
          justifySelf="center"
          type="submit"
          textTransform="capitalize"
          onClick={toggle}
        >
          {visible ? "View" : "Close"}
        </Button>
      </Grid>

      {!visible && <ProposalDetails />}
    </Box>
  );
};

export const Proposals = () => {
  return (
    <Box mt="3rem" maxHeight="63vh" className="scroll-bar">
      <Grid gridGap="1rem">
        {[1, 2, 3, 4].map((index) => (
          <ProposalsList key={index} index={index} />
        ))}
      </Grid>
    </Box>
  );
};
