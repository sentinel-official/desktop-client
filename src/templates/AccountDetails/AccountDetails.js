import { Text, Box, Grid, Flex } from "atoms";
import MemoAddress from "assets/icons/Address";
import MemoSeed from "assets/icons/Seed";

export const AccountDetails = () => {
  return (
    <Grid gridTemplateColumns="1fr 3fr 1fr" alignItems="center">
      <Box />
      <Box>
        <Text as="h3" variant="heading3" color="primary.700" textAlign="center">
          Account Created Successfully
        </Text>
        <Box mb="2rem">
          <Flex alignItems="center" pb="1rem">
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

          <Text as="p" variant="small" color="grey.900" m={0} pb="1rem">
            cosmosaccaddr1q0sxllakn9eh75nl2cntvfwnegxqfljjmeggj7
          </Text>
        </Box>
        <Box mb="2rem">
          <Flex alignItems="center" pb="1rem">
            <Text
              variant="label"
              fontWeight="medium"
              color="grey.700"
              m={0}
              textTransform="uppercase"
              mr="1rem"
            >
              Public key
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
          <Text as="p" variant="small" color="grey.900" m={0} pb="1rem">
            cosmosaccpub1addwnpepqvw3ea6crfamul8a9v3vlle6p2c99cx02ykex9u09r3p72g83w7vxu09k6z
          </Text>
        </Box>

        <Box>
          <Flex alignItems="center" pb="1rem">
            <Text
              variant="label"
              fontWeight="medium"
              color="grey.700"
              m={0}
              textTransform="uppercase"
              mr="1rem"
            >
              Seed
            </Text>
            <Flex
              bg="grey.400"
              borderRadius="4rem"
              height="2.5rem"
              width="2.5rem"
              alignItems="center"
              justifyContent="center"
            >
              <MemoSeed height="1rem" />
            </Flex>
          </Flex>
          <Grid
            border="1px dashed"
            borderColor="grey.700"
            gridTemplateColumns="repeat(8, auto [col-start])"
            gridGap="1rem"
            p="1rem"
          >
            <Text as="p" variant="body" color="grey.900" m={0}>
              awkward
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              lonely
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              swear
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              car
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              strategy
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              bacon
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              theory
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              grab
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              lottery
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              wear
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              hope
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              tiger
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              future
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              resource
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              enact
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              best
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              common
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              tornado
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              beach
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              always
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              pause
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              bonus
            </Text>
            <Text as="p" variant="body" color="grey.900" m={0}>
              urban
            </Text>
          </Grid>
          <Text as="p" variant="small" color="grey.700">
            <Text
              as="span"
              variant="small"
              fontWeight="medium"
              color="grey.700"
              m={0}
              textTransform="uppercase"
              mr="1rem"
            >
              Note:
            </Text>
            Copy your keys to a secure location. Remember, we don't store any of
            your keys in our databases.
          </Text>
        </Box>
      </Box>
      <Box />
    </Grid>
  );
};
