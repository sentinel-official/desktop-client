import MemoCancelSubscription from "assets/icons/CancelSubscription";
import { Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { UnSubscribeModal } from "organisms/UnSubscribeModal";
import { SubscribedNodeHosterList } from "./SubscribedNodeHosterList";

export const SubscribedNodeHosterDetail = ({ setConnect }) => {
  const { visible, hide, toggle } = useVisibleState(false);
  return (
    <>
      <Grid
        py="1.5rem"
        gridTemplateColumns="1fr  1fr 1fr "
        alignItems="center"
        pl="5rem"
        borderBottom="1px solid"
        borderColor="border.500"
        bg="bg.700"
      >
        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          LOCATION
        </Text>

        <Text color="text.500" fontSize="1.4rem">
          BANDWIDTH
        </Text>
        <Text color="text.500" fontSize="1.4rem">
          CONNECT
        </Text>
      </Grid>
      <Grid bg="bg.700">
        {[1, 2, 3].map((index) => (
          <SubscribedNodeHosterList key={index} setConnect={setConnect} />
        ))}
        <Flex
          justifyContent="center"
          alignItems="center"
          py="1.5rem"
          borderBottom="1px solid"
          borderColor="border.500"
          cursor="pointer"
          onClick={toggle}
        >
          <MemoCancelSubscription height="1.5rem" width="2rem" fill="#FF4B55" />
          <Text
            color="error.500"
            fontSize="1.4rem"
            fontWeight="medium"
            pl="1rem"
          >
            CANCEL SUBSCRIPTION
          </Text>
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
    </>
  );
};
