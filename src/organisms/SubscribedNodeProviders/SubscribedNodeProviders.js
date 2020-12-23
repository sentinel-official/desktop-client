import { Box, Grid, Text } from "atoms";
import { SubscribedNodeProviderList } from "./molecules/SubscribedNodeProviderList";

export const SubscribedNodeProvider = ({ connect, setConnect }) => {
  return (
    <Box mr="1rem">
      <Grid
        pt="2rem"
        px="3rem"
        gridTemplateColumns="1fr 1fr 12rem 10rem 1.5fr"
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
            VALIDITY
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            NODES
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            VIEW NODES
          </Text>
        </Box>
      </Grid>

      <Box maxHeight="72vh" className="scroll-bar">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((index) => (
          <SubscribedNodeProviderList
            connect={connect}
            setConnect={setConnect}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};
