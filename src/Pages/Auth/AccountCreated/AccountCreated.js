import { Link } from "react-router-dom";
import { SentinelIntro } from "molecules/SentinelIntro";
import { Box, Grid, Text, Flex, Button } from "atoms";
import { SocialSecion } from "molecules/SocialSecion";
import { AccountDetails } from "templates/AccountDetails/AccountDetails";
import MemoAccept from "assets/icons/Accept";
// import { MinimiseSection } from "molecules/MinimiseSection";

export const AccountCreated = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        {/* <MinimiseSection /> */}
        <Box height="2rem" />
        <AccountDetails />
        <Box
          borderTop="1px solid "
          borderColor="border.0"
          alignSelf="end"
          p="1rem 2rem "
        >
          <Grid
            gridAutoFlow="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <SocialSecion />
            <Grid gridAutoFlow="column" gridGap="2rem" alignItems="center">
              <Flex alignItems="center">
                <MemoAccept />
                <Text
                  variant="small"
                  color="black"
                  fontWeight="medium"
                  ml="1rem"
                >
                  I have secured the seed safely
                </Text>
              </Flex>
              <Link to="/dashboard/wallet">
                <Button px="3rem" justifySelf="center" type="submit">
                  Continue
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
