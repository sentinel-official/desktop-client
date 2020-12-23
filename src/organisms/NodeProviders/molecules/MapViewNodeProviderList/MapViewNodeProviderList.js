import MemoProfile from "assets/icons/Profile";
import MemoProvider from "assets/icons/Provider";
import { Box, Grid, Text, Flex, Button } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import { SubscribedModal } from "organisms/SubscribedModal";

export const MapViewNodeProviderList = ({ setConnect }) => {
  const { visible, toggle, show, hide } = useVisibleState(false);
  return (
    <>
      <Grid>
        <Grid
          py="1rem"
          gridTemplateColumns="1fr  1fr 1fr 1.5fr"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="border.500"
        >
          <Flex alignItems="center">
            <MemoProfile height="2rem" width="2rem" />
            <Box pl="2rem">
              <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
                Germany01
              </Text>
              <Text
                color="primary.700"
                fontSize="1.4rem"
                fontWeight="medium"
                pt="1rem"
              >
                542.45 Mbps
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
              50GB
              <Text
                as="span"
                color="primary.700"
                fontSize="1.4rem"
                fontWeight="medium"
                pl=".5rem"
              >
                / 15000SENT
              </Text>
            </Text>
            <Text
              color="text.500"
              fontSize="1.4rem"
              fontWeight="medium"
              pt="1rem"
            >
              2 Months
            </Text>
          </Box>

          <Box textAlign="center">
            <MemoProvider m="auto" />
            <Text color="primary.700" fontSize="1.4rem" ml=".5rem">
              ABC Node Hosters
            </Text>
          </Box>
          <Box textAlign="right">
            <Button variant="primary" px="3rem" mx="2rem" onClick={show}>
              SUBSCRIBE
            </Button>
          </Box>
        </Grid>
      </Grid>
      {visible && (
        <SubscribedModal
          setConnect={setConnect}
          visible={visible}
          toggle={toggle}
          show={show}
          hide={hide}
        />
      )}
    </>
  );
};
