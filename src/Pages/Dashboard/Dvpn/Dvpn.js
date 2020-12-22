import { useState } from "react";

import { Box, Grid } from "atoms";
import { DvpnDetails } from "templates/DvpnDetails";
import { QuickConnect } from "./molecules/QuickConnect";
import { SessionHistory } from "./molecules/SessionHistory";

export const Dvpn = () => {
  const [connect, setConnect] = useState(false);
  return (
    <Grid gridTemplateColumns="1fr 2.2fr" bg="bg.500">
      <Box border="1px solid" borderColor="border.500">
        <QuickConnect connect={connect} setConnect={setConnect} />
        <SessionHistory />
      </Box>
      <DvpnDetails connect={connect} setConnect={setConnect} />
    </Grid>
  );
};
