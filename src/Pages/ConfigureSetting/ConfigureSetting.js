import { Grid } from "atoms";
import { SentinelIntro } from "molecules/SentinelIntro";
import { ConfigureSettingForm } from "templates/ConfigureSettingForm";

export const ConfigureSetting = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        <ConfigureSettingForm />
      </Grid>
    </Grid>
  );
};
