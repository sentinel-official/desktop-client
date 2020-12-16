import { Box, Text, Flex, Image } from "atoms";
import QrCode from "../../../../../assets/images/qr-code.jpg";
import MemoAddress from "assets/icons/Address";

export const RecieveQrCode = () => {
  return (
    <Box textAlign="center">
      <Text variant="label" fontWeight="medium" color="grey.700" mt="2rem">
        Show QR code to Receive Tokens
      </Text>
      <Image
        src={QrCode}
        alt="QR Code"
        height="10rem"
        width="10rem"
        m="auto"
        mt="2rem"
      />
      <Box mt="2rem">
        <Flex justifyContent="center" alignItems="center" pb="1rem">
          <Text
            variant="label"
            fontWeight="medium"
            color="grey.700"
            m={0}
            textTransform="uppercase"
            mr="1rem"
          >
            ADDRESS
          </Text>
          <Flex
            bg="grey.400"
            borderRadius="4rem"
            height="2.5rem"
            width="2.5rem"
            alignItems="center"
            justifyContent="center"
          >
            <MemoAddress height="1rem" />
          </Flex>
        </Flex>

        <Text as="p" variant="small" color="grey.900" m={0}>
          cosmosaccaddr1q0sxllakn9eh75nl2cntvfwnegxqfljjmeggj7
        </Text>
      </Box>
    </Box>
  );
};
