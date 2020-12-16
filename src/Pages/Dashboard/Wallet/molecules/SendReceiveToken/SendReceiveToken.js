import { useState } from "react";
import { Box, Grid, Button } from "atoms";
import { SendTokenForm } from "../SendTokenForm";
import { RecieveQrCode } from "../RecieveQrCode";

export const SendReceiveToken = () => {
  const [visibleSendToken, setVisibleSendToken] = useState(true);
  const [visibleReceiveToken, setVisibleReceiveToken] = useState(false);

  const SendTokenHandler = () => {
    setVisibleSendToken(true);
    setVisibleReceiveToken(false);
  };
  const ReceiveTokenHandler = () => {
    setVisibleSendToken(false);
    setVisibleReceiveToken(true);
  };

  return (
    <Box mt="1rem">
      <Grid justifyContent="stretch" gridTemplateColumns="1fr 1fr">
        <Button
          variant="withoutBorder"
          textTransform="capitalize"
          onClick={SendTokenHandler}
        >
          Send
        </Button>
        <Button
          variant="withoutBorder"
          textTransform="capitalize"
          onClick={ReceiveTokenHandler}
        >
          Receive
        </Button>
      </Grid>
      <Box>{visibleSendToken ? <SendTokenForm /> : <RecieveQrCode />}</Box>
    </Box>
  );
};
