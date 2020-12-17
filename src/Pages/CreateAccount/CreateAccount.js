import { Link } from "react-router-dom";
import { Box, Grid, Text, Button } from "atoms";
import { SignupForm } from "templates/SignupForm";
import { SentinelIntro } from "molecules/SentinelIntro";
import { SocialSecion } from "molecules/SocialSecion";

export const CreateAccount = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        <Box height="2rem" />
        <SignupForm />
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
              <Text variant="field" color="grey.700">
                Agree with{" "}
                <Text
                  as="span"
                  variant="field"
                  color="primary.500"
                  textDecoration="underline"
                  cursor="pointer"
                >
                  Terms & Conditions
                </Text>
              </Text>
              <Link to="/account-created">
                <Button px="3rem" justifySelf="center" type="submit">
                  Create
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
