import { Grid, Text } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { SubscribedModal } from "organisms/SubscribedModal";

export const NodeHosterList = ({ setSubscribe }) => {
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
        <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
          01
        </Text>
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
          Subscribe
        </Text>
      </Grid>
      {visible && (
        <SubscribedModal
          setSubscribe={setSubscribe}
          visible={visible}
          toggle={toggle}
          hide={hide}
        />
      )}
    </>
  );
};
