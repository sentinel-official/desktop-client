import { Grid } from "atoms";
import { LoginForm } from "templates/LoginForm";
import { SentinelIntro } from "molecules/SentinelIntro";

export const Login = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        <LoginForm />
      </Grid>
    </Grid>
  );
};
