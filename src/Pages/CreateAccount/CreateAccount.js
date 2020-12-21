import { Grid } from "atoms";
import { SignupForm } from "templates/SignupForm";
import { SentinelIntro } from "molecules/SentinelIntro";

export const CreateAccount = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        <SignupForm />
      </Grid>
    </Grid>
  );
};
