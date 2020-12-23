import { Grid, Text } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { ConnectModal } from "organisms/ConnectModal";

export const SubscribedNodeHosterList = ({ setConnect }) => {
  const { visible, hide, toggle } = useVisibleState(false);

  return (
    <>
      <Grid
        py="1.5rem"
        pl="5rem"
        gridTemplateColumns="1fr  1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          United States
        </Text>
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          542.45 Mbps
        </Text>

        <Text
          color="primary.500"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
        >
          Connect
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
