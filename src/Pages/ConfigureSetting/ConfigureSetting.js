import { Box, Grid, Button } from "atoms";
import { SentinelIntro } from "molecules/SentinelIntro";
import { MinimiseSection } from "molecules/MinimiseSection";
import { SocialSecion } from "molecules/SocialSecion";
import { ConfigureSettingForm } from "templates/ConfigureSettingForm";
import { Link } from "react-router-dom";

export const ConfigureSetting = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        <MinimiseSection />
        <ConfigureSettingForm />
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
              <Link to="/dashboard/wallet">
                <Button px="3rem" justifySelf="center" type="submit">
                  Save
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
