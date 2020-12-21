import { Box, Grid } from "atoms";
import { WalletDetails } from "organisms/WalletDetails";
import { Token } from "./molecules/Token";

export const Wallet = () => {
  return (
    <Grid gridTemplateColumns="1fr 2.2fr" bg="bg.500">
      <Box border="1px solid" borderColor="border.500">
        <Token />
      </Box>
      <WalletDetails />
    </Grid>
  );
};
