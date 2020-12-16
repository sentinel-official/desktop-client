import { Box, Grid, Text } from "atoms";
import MemoLogo from "assets/icons/Logo";
import MemoDesign from "assets/icons/Design";

export const SentinelIntro = () => {
  return (
    <Box bg="primary.600" height="100vh" textAlign="center">
      <Box position="absolute" bottom={0} opacity="0.4">
        <MemoDesign height="100vh" width="40rem" />
      </Box>
      <Grid
        flexDirection="row"
        justifyContent="space-between"
        textAlign="center"
        height="100%"
        py="5rem"
      >
        <Box mt="10%">
          <MemoLogo fill="primary.500" />
        </Box>
        <Box alignSelf="end">
          <Text
            as="p"
            variant="small"
            color="grey.700"
            lineHeight="155%"
            px="4rem"
          >
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam”
          </Text>
          <Text
            as="h2"
            variant="heading6"
            color="white"
            fontFamily="secondary"
            mb={3}
            mt="4rem"
          >
            SENTINEL
          </Text>
          <Text variant="verySmall" color="white" fontFamily="primary">
            v3.01.12
          </Text>
        </Box>
      </Grid>
    </Box>
  );
};
