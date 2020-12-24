import { useState } from "react";

import { Box, Grid } from "atoms";
import { DvpnDetails } from "templates/DvpnDetails";
import { QuickConnect } from "./molecules/QuickConnect";
import { SessionHistory } from "./molecules/SessionHistory";

export const Dvpn = ({ connect, setConnect }) => {
  const [subscribe, setSubscribe] = useState(false);
  const [subscribedIndividual, setSubscribedIndividual] = useState(false);

  return (
    <Grid gridTemplateColumns="1fr 2.2fr" bg="bg.500">
      <Box border="1px solid" borderColor="border.500">
        <QuickConnect connect={connect} setConnect={setConnect} />
        <SessionHistory />
      </Box>
      <DvpnDetails
        connect={connect}
        setConnect={setConnect}
        subscribe={subscribe}
        setSubscribe={setSubscribe}
        subscribedIndividual={subscribedIndividual}
        setSubscribedIndividual={setSubscribedIndividual}
      />
    </Grid>
  );
};
