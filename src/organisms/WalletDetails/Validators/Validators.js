import MemoProfile from "assets/icons/Profile";
import { Box, Grid, Text, Flex } from "atoms";

const ValidatorsList = ({ index }) => {
  return (
    <Grid
      py="1rem"
      gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr"
      alignItems="center"
      borderBottom={index < 3 ? "1px solid" : "none"}
      borderColor="border.500"
    >
      <Flex alignItems="center">
        <MemoProfile height="2.5rem" width="2.5rem" />
        <Text
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          ml="1rem"
        >
          Forbole
        </Text>
      </Flex>

      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        1,190,255 (6.62%)
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        94.04%
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        10.00%
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        100.00%
      </Text>
      <Text
        color="primary.500"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        DELEGATE
      </Text>
    </Grid>
  );
};

export const Validators = () => {
  return (
    <Box mr="1rem">
      <Grid py="1.5rem" gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr">
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
            VOTING POWER
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            SELF
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            COMMISSION
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            UPTIME
          </Text>
        </Box>
        <Box py={4} />
      </Grid>

      <Grid gridGap="1rem">
        {[1, 2, 3].map((index) => (
          <ValidatorsList key={index} index={index} />
        ))}
      </Grid>
    </Box>
  );
};
