import { Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { NodeHosterDetail } from "../NodeHosterDetail";

export const NodeProvidersSubscribedList = ({ setSubscribe }) => {
  const { visible, toggle } = useVisibleState(true);
  return (
    <>
      <Grid
        py="1.5rem"
        px="3rem"
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
      {!visible && <NodeHosterDetail setSubscribe={setSubscribe} />}
    </>
  );
};
