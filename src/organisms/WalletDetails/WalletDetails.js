import MemoProfile from "assets/icons/Profile";
import { Box, Grid, Text, Flex, Button } from "atoms";
import { useState } from "react";
import SearchField from "react-search-field";

const ValidatorsList = ({ index }) => {
  return (
    <Grid
      py="1rem"
      gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr"
      alignItems="center"
      borderBottom={index < 3 ? "1px solid" : "none"}
      borderColor="border.500"
    >
      <Flex alignItems="center">
        <MemoProfile height="2.5rem" width="2.5rem" />
        <Text
          color="primary.700"
          fontSize="1.4rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          ml="1rem"
        >
          Forbole
        </Text>
      </Flex>

      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        1,190,255 (6.62%)
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        94.04%
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        10.00%
      </Text>
      <Text
        color="primary.700"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        100.00%
      </Text>
      <Text
        color="primary.500"
        fontSize="1.4rem"
        textDecoration="none"
        lineHeight="100%"
      >
        DELEGATE
      </Text>
    </Grid>
  );
};

const ValidatorTable = () => {
  return (
    <Box>
      <Grid py="1.5rem" gridTemplateColumns="1fr 1.5fr 1fr 1fr 1fr 1fr">
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            MONIKER
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            VOTING POWER
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            SELF
          </Text>
        </Box>

        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            COMMISSION
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
          >
            UPTIME
          </Text>
        </Box>
        <Box py={4}>
          <Text
            color="text.500"
            fontWeight="medium"
            fontSize="1.3rem"
            textTransform="uppercase"
            visiblity="hidden"
          ></Text>
        </Box>
      </Grid>

      <Grid gridGap="1rem">
        {[1, 2, 3].map((index) => (
          <ValidatorsList key={index} index={index} />
        ))}
      </Grid>
    </Box>
  );
};

export const WalletDetails = () => {
  const [visibleValidatorList, setVisibleValidatorList] = useState(true);
  const [visibleProposal, setVisibleProposal] = useState(false);

  const ValidatorListHandler = () => {
    setVisibleValidatorList(true);
    setVisibleProposal(false);
  };
  const ProposalHandler = () => {
    setVisibleValidatorList(false);
    setVisibleProposal(true);
  };
  const onChangeHandler = () => {};
  return (
    <Box pt="5rem" px="3rem">
      <Text
        variant="field"
        fontWeight="medium"
        color="grey.300"
        textTransform="uppercase"
      >
        SENT
      </Text>
      <Text
        variant="heading5"
        fontWeight="medium"
        color="primary.700"
        pt="2rem"
      >
        $5414.28
        <Text as="span" variant="small" color="green.500" pl="1rem">
          (+3.5%)
        </Text>
      </Text>
      <Box mt="5rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          gridGap="2rem"
          alignItems="center"
        >
          <Flex>
            <Button
              variant={visibleValidatorList ? "secondary" : "normal"}
              px="3rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ValidatorListHandler}
            >
              Validators List
            </Button>
            <Button
              variant={visibleProposal ? "secondary" : "normal"}
              px="3rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ProposalHandler}
            >
              Proposals
            </Button>
          </Flex>
          <SearchField
            placeholder="Search"
            onChange={onChangeHandler}
            classNames="search-container"
          />
        </Grid>
      </Box>
      {visibleValidatorList ? (
        <ValidatorTable />
      ) : (
        <Box mt="5rem"> No Data</Box>
      )}
    </Box>
  );
};
