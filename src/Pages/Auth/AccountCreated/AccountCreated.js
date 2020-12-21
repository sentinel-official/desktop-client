import { SentinelIntro } from "molecules/SentinelIntro";
import { Grid } from "atoms";
import { AccountDetails } from "templates/AccountDetails/AccountDetails";

export const AccountCreated = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <AccountDetails />
    </Grid>
  );
};
