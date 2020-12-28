import { Box, Grid } from "atoms";
import { WalletDetails } from "templates/WalletDetails";
import { Token } from "./molecules/Token";

export const Wallet = () => {
  return (
    <Grid gridTemplateColumns="34rem 2.2fr" bg="bg.500">
      <Box border="1px solid" borderColor="border.500">
        <Token />
      </Box>
      <WalletDetails />
    </Grid>
  );
};
