import { useState } from "react";
import { Box, Grid, Text, Flex, Button } from "atoms";
import SearchField from "react-search-field";

import { Proposals } from "organisms/Proposals/";
import { Validators } from "organisms/Validators";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import { DropdownFilter } from "molecules/DropdownFilter";

export const ShowPopup = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <DropdownFilter
      render={
        <Grid width="15rem" py="2rem">
          <Flex px="2rem" cursor="pointer" alignItems="center">
            <Text
              width="100%"
              fontSize="1.4rem"
              fontWeight="medium"
              pb="1rem"
              mb={0}
              color="gray.900"
            >
              RE-DELEGATE
            </Text>
          </Flex>

          <Flex px="2rem" cursor="pointer" alignItems="center">
            <Text
              width="100%"
              fontWeight="medium"
              fontSize="1.4rem"
              color="gray.900"
              pt="1rem"
            >
              UNBOND
            </Text>
          </Flex>
        </Grid>
      }
      onClose={() => setDropdown(false)}
      open={dropdown}
      onOpen={() => setDropdown(true)}
    >
      <Flex
        alignItems="center"
        border="1px solid "
        borderColor="border.500"
        p="1rem"
        borderRadius="3rem"
      >
        <Text
          color="primary.700"
          fontSize="1.2rem"
          fontWeight="medium"
          textDecoration="none"
          lineHeight="100%"
          mr="1rem"
        >
          DELEGATE
        </Text>
        <MemoArrowBottom height=".8rem" width="1rem" />
      </Flex>
    </DropdownFilter>
  );
};

export const WalletDetails = () => {
  const [visibleValidatorList, setVisibleValidatorList] = useState(true);
  const [visibleProposal, setVisibleProposal] = useState(false);
  const [visibleActive, setVisibleActive] = useState(true);
  const [visibleInActive, setVisibleInActive] = useState(false);

  const ValidatorListHandler = () => {
    setVisibleValidatorList(true);
    setVisibleProposal(false);
  };
  const ProposalHandler = () => {
    setVisibleValidatorList(false);
    setVisibleProposal(true);
  };
  const onChangeHandler = () => {};

  const activeValidatorsHandler = () => {
    setVisibleActive(true);
    setVisibleInActive(false);
  };
  const inActiveValidatorsHandler = () => {
    setVisibleInActive(true);
    setVisibleActive(false);
  };

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
      <Box mt="5rem" mr="1rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          gridGap="2rem"
          alignItems="center"
        >
          <Flex>
            <Button
              variant={visibleValidatorList ? "greyBorder" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ValidatorListHandler}
            >
              Validators List
            </Button>
            <Button
              variant={visibleProposal ? "greyBorder" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ProposalHandler}
            >
              Proposals
            </Button>
          </Flex>
          <Grid
            gridGap="1rem"
            gridAutoFlow="column"
            justifyContent="end"
            alignItems="center"
          >
            <Box />
            {visibleValidatorList && (
              <>
                <Flex>
                  <Button
                    variant={visibleActive ? "active" : "inActive"}
                    textVariant="label"
                    px="1rem"
                    justifySelf="center"
                    type="submit"
                    textTransform="capitalize"
                    onClick={activeValidatorsHandler}
                  >
                    Active
                  </Button>
                  <Button
                    variant={visibleActive ? "inActive" : "active"}
                    textVariant="label"
                    px="1rem"
                    justifySelf="center"
                    type="submit"
                    textTransform="capitalize"
                    onClick={inActiveValidatorsHandler}
                  >
                    InActive
                  </Button>
                </Flex>
                <ShowPopup />
              </>
            )}
            <SearchField
              placeholder="Search"
              onChange={onChangeHandler}
              classNames="search-container"
            />
          </Grid>
        </Grid>
      </Box>
      {visibleValidatorList ? <Validators /> : <Proposals />}
    </Box>
  );
};
