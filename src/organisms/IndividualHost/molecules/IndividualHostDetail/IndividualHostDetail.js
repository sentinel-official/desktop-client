import { Box, Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import MemoProfile from "assets/icons/Profile";
import MemoSort from "assets/icons/Sort";
import { SubscribedModal } from "organisms/SubscribedModal";
import { SubscribeIndividualHostModal } from "organisms/SubscribeIndividualHostModal";

const IndividualHostList = ({
  connect,
  setConnect,
  setSubscribedIndividual,
}) => {
  const { visible, hide, toggle } = useVisibleState(false);

  return (
    <>
      <Grid
        py="1.5rem"
        px="3rem"
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
          onClick={toggle}
        >
          Subscribe
        </Text>
      </Grid>
      {visible && (
        <SubscribeIndividualHostModal
          setConnect={setConnect}
          setSubscribedIndividual={setSubscribedIndividual}
          visible={visible}
          toggle={toggle}
          hide={hide}
        />
      )}
    </>
  );
};

export const IndividualHostDetail = ({
  connect,
  setConnect,
  subscribedIndividual,
  setSubscribedIndividual,
}) => {
  return (
    <Box mr="1rem">
      <Grid
        pt="2rem"
        px="3rem"
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
            SUBSCRIBE
          </Text>
        </Box>
      </Grid>

      <Grid>
        {[1, 2, 3, 4, 5].map((index) => (
          <IndividualHostList
            key={index}
            connect={connect}
            setConnect={setConnect}
            subscribedIndividual={subscribedIndividual}
            setSubscribedIndividual={setSubscribedIndividual}
          />
        ))}
      </Grid>
    </Box>
  );
};
