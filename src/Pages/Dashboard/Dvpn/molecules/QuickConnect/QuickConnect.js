import MemoConnect from "assets/icons/Connect";
import { Box, Text, Flex, Modal, ModalClose, Button } from "atoms";
import useVisibleState from "hooks/useVisibleStates";

export const QuickConnect = ({ connect, setConnect }) => {
  const { visible, hide, toggle } = useVisibleState(false);

  const connectHandler = () => {
    if (!connect) {
      toggle();
    }

    setConnect(false);
  };
  return (
    <>
      <Box textAlign="center" my="7rem">
        <Text color="primary.700" fontSize="1.6rem" fontWeight="medium">
          Your connection Secure
        </Text>
        <Text
          color="primary.700"
          fontSize="1.6rem"
          fontWeight="medium"
          pt="1.5rem"
        >
          Your IP:
          <Text
            as="span"
            color={!connect ? "warning.500" : "green.500"}
            fontSize="1.6rem"
            fontWeight="semiBold"
            pl=".5rem"
          >
            154.154.2.1
          </Text>
        </Text>
        <Button
          variant="primary"
          px="4rem"
          mt="3rem"
          justifySelf="center"
          type="submit"
          onClick={connectHandler}
        >
          {!connect ? "Quick Connect" : "Disconnect"}
        </Button>
      </Box>
      {visible && (
        <Modal isOpen={visible} onRequestClose={hide} ariaHideApp={false}>
          <ModalClose onClick={hide} />

          <Box p="8rem">
            <Box mx="auto" textAlign="center">
              <MemoConnect height="5rem" width="5rem" mx="auto" />
            </Box>
            <Flex alignItems="center">
              <Text
                variant="heading7"
                fontWeight="medium"
                color="primary.700"
                textAlign="center"
                p="3rem"
              >
                Connecting to the best available Node...
              </Text>
            </Flex>

            <Text
              variant="field"
              fontWeight="medium"
              color="primary.500"
              textAlign="center"
            >
              Cancel
            </Text>
          </Box>
        </Modal>
      )}
    </>
  );
};
