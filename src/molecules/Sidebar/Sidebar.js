import { Box, Grid, Text, Flex } from "atoms";
import MemoProfile from "assets/icons/Profile";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import MemoLock from "assets/icons/Lock";
import MemoWallet from "assets/icons/Wallet";
import MemoActiveBorder from "assets/icons/ActiveBorder";

export const Sidebar = () => {
  return (
    <Box bg="primary.600" height="100vh" textAlign="center">
      <Box bg="white" p="2rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="center"
          alignItems="center"
          gridGap="1rem"
        >
          <MemoProfile height="2rem" width="2rem" />
          <Text variant="field" fontWeight="medium" color="primary.700">
            Barry Allen
          </Text>
          <Box cursor="pointer">
            <MemoArrowBottom height="0.8rem" width="1rem" />
          </Box>
        </Grid>
      </Box>
      <Box>
        <Flex alignItems="center" p="2rem 3.5rem">
          <MemoLock height="2rem" width="2rem" />
          <Text variant="field" fontWeight="medium" color="#55678B" px="2rem">
            dVPN
          </Text>
        </Flex>
        <Flex alignItems="center" py="1rem" cursor="pointer">
          <MemoActiveBorder
            height="4.3remrem"
            width=".5rem"
            alignSelf="start"
          />
          <Flex pl="3rem">
            <MemoWallet height="2rem" width="2rem" />
            <Text variant="field" fontWeight="medium" color="white" px="2rem">
              Wallet
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
