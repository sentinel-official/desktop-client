import MemoArrowBottom from "assets/icons/ArrowBottom";
import MemoArrowRight from "assets/icons/ArrowRight";
import { Box, Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { SubscribedNodeHosterDetail } from "../SubscribedNodeHosterDetail";

export const SubscribedNodeProviderList = ({ connect, setConnect }) => {
  const { visible, toggle } = useVisibleState(false);
  return (
    <Box mr="1rem">
      <Grid
        py="1.5rem"
        px="3rem"
        gridTemplateColumns="1fr 1fr 12rem 10rem 1.5fr"
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
        <Text
          color="text.500"
          fontSize="1.4rem"
          fontWeight="medium"
          cursor="pointer"
        >
          2 Months
        </Text>

        <Text color="primary.700" fontSize="1.4rem" className="truncate-text">
          5
        </Text>
        <Flex alignItems="center" onClick={toggle}>
          <Text
            color="text.500"
            fontSize="1.4rem"
            cursor="pointer"
            fontWeight="medium"
            pr="1rem"
          >
            (35GB/50GB, 24 days left)
          </Text>
          {!visible ? (
            <MemoArrowRight height="1rem" width="1rem" fill="text.500" />
          ) : (
            <MemoArrowBottom height="1rem" width="1rem" fill="text.500" />
          )}
        </Flex>
      </Grid>
      {visible && (
        <SubscribedNodeHosterDetail connect={connect} setConnect={setConnect} />
      )}
    </Box>
  );
};
