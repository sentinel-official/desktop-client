import { Box, Grid, Text } from "atoms";
import { SubscribedIndividualHostList } from "./SubscribedIndividualHostList";

export const SubscribedIndividualHostDetail = ({ connect, setConnect }) => {
  return (
    <Box mr="1rem">
      <Grid
        pt="2rem"
        px="3rem"
        gridTemplateColumns="1fr 1.5fr 1fr 1.5fr 13rem"
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
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            USAGE
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
            // textAlign="center"
          >
            CONNECT
          </Text>
        </Box>
      </Grid>

      <Box>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <SubscribedIndividualHostList
            connect={connect}
            setConnect={setConnect}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};
