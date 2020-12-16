import MemoLogo from "assets/icons/Logo";
import MemoSent from "assets/icons/Sent";
import { Box, Grid, Text, Flex } from "atoms";
import { SendReceiveToken } from "../SendReceiveToken";
import { Withdraw } from "../Withdraw";

export const Token = () => {
  return (
    <Box>
      <Box p="2rem 3rem">
        <Text variant="field" fontWeight="medium" color="primary.700">
          Barry Allen
        </Text>
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="0px 4px 17px rgba(0, 0, 0, 0.08)"
          p=" 1rem"
          mt="1rem"
        >
          <Grid
            gridAutoFlow="column"
            gridGap="1rem"
            alignItems="center"
            justifyContent="start"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bg="bg.600"
              borderRadius="4rem"
              height="3rem"
              width="3rem"
            >
              <MemoLogo height="2rem" width="1.5rem" />
            </Flex>
            <Text
              variant="field"
              fontWeight="medium"
              color="primary.700"
              textTransform="uppercase"
            >
              SENTINEL
              <Text
                as="span"
                variant="small"
                fontWeight="medium"
                color="primary.700"
                textTransform="uppercase"
                ml=".5rem"
              >
                (SENT)
              </Text>
            </Text>
          </Grid>
          <Box>
            <MemoSent height="1rem" width="1rem" />
          </Box>
        </Grid>
      </Box>
      <SendReceiveToken />
      <Withdraw />
    </Box>
  );
};
