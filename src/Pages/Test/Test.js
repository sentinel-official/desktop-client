import MemoTwitter from "assets/icons/Twitter";
import { Flex, Text, Box, Grid } from "atoms";
import { InputField } from "atoms/InputField";

export const Test = () => {
  return (
    <div>
      {" "}
      <Flex justifyContent="center" alignItems="center" mb="5rem" width="70vw">
        <Text variant="titleBold"> title bold</Text>
        <Box
          position="absolute"
          right="0"
          fontSize="4rem"
          fontWeight="300"
          cursor="pointer"
        >
          Box close
        </Box>
      </Flex>
      <Grid gridAutoFlow="column" justifyContent="space-between" gridGap="5rem">
        <Box>
          <Text variant="field" color="grey.700">
            Email
          </Text>
          <InputField name="email" label="Enter Email" />
        </Box>
        <Box>
          <Text variant="field" color="grey.700">
            Password
          </Text>
          <InputField name="name" label="Enter Password" />
        </Box>
        <MemoTwitter fill="#55678B" />
      </Grid>
    </div>
  );
};
