import MemoCancelSubscription from "assets/icons/CancelSubscription";
import MemoProfile from "assets/icons/Profile";
import { Box, Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { UnSubscribeModal } from "organisms/UnSubscribeModal";

export const SubscribedIndividualHostList = ({ connect, setConnect }) => {
  const { visible, toggle, show, hide } = useVisibleState(false);
  const connectHandler = () => {
    // show();
    setConnect(true);
  };
  const unSubscribeHandler = () => {
    show();
  };

  return (
    <Box mr="1rem">
      <Grid
        py="1.5rem"
        px="3rem"
        gridTemplateColumns="1fr 1.5fr 1fr 1.5fr 12rem"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Flex alignItems="center">
          <MemoProfile height="2rem" width="2rem" />
          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            ml="1rem"
          >
            sdfsdg
          </Text>
        </Flex>
        <Flex alignItems="center">
          <MemoProfile height="2rem" width="2rem" />
          <Text
            color="primary.700"
            fontSize="1.4rem"
            fontWeight="medium"
            ml="1rem"
          >
            United States
          </Text>
        </Flex>

        <Text
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
          cursor="pointer"
        >
          542.45 Mbps
        </Text>

        <Text color="text.500" fontSize="1.4rem" className="truncate-text">
          (35GB/50GB, 24 days left)
        </Text>
        <Flex justifyContent="start" alignItems="center">
          <Text
            color="primary.500"
            fontSize="1.4rem"
            cursor="pointer"
            fontWeight="medium"
            pr="3rem"
            onClick={connectHandler}
            // textAlign="center"
          >
            Connect
          </Text>
          <MemoCancelSubscription
            height="1.5rem"
            width="1.5rem"
            fill="#FF4B55"
            onClick={unSubscribeHandler}
          />
        </Flex>
      </Grid>
      {visible && (
        <UnSubscribeModal
          setConnect={setConnect}
          visible={visible}
          toggle={toggle}
          hide={hide}
        />
      )}
    </Box>
  );
};
