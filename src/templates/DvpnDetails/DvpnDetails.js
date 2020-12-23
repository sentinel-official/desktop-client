import { useState } from "react";

import { Box, Grid, Flex, Button } from "atoms";
import SearchField from "react-search-field";
import { NodeProviders } from "organisms/NodeProviders";
import { IndividualHost } from "organisms/IndividualHost";
import MemoProvider from "assets/icons/Provider";
import MemoHost from "assets/icons/Host";
import MemoListView from "assets/icons/ListView";
import MemoMapView from "assets/icons/MapView";
import MemoHeart from "assets/icons/Heart";

export const DvpnDetails = ({
  connect,
  setConnect,
  subscribe,
  setSubscribe,
  subscribedIndividual,
  setSubscribedIndividual,
}) => {
  const [visibleNodeProviderList, setVisibleNodeProviderList] = useState(true);
  const [visibleIndivisualHost, setVsibleIndivisualHost] = useState(false);
  const [visibleListView, setVisibleListView] = useState(true);

  const ValidatorListHandler = () => {
    setVisibleNodeProviderList(true);
    setVsibleIndivisualHost(false);
  };
  const ProposalHandler = () => {
    setVisibleNodeProviderList(false);
    setVsibleIndivisualHost(true);
  };
  const onChangeHandler = () => {};
  const listViewHandler = () => {
    setVisibleListView(true);
  };
  const mapViewHandler = () => {
    setVisibleListView(false);
  };

  const subscribeHandler = () => {
    setSubscribe(!subscribe);
    setSubscribedIndividual(!subscribedIndividual);
  };

  console.log("subscribedIndividual", subscribedIndividual);
  return (
    <Box pt="7rem">
      <Box px="3rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="space-between"
          gridGap="2rem"
          alignItems="center"
        >
          <Flex>
            <Button
              variant={visibleNodeProviderList ? "primaryShadow" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ValidatorListHandler}
            >
              <Grid alignItems="center" gridAutoFlow="column" gridGap=".5rem">
                <MemoProvider
                  fill={visibleNodeProviderList ? "#55678B" : "#95A7CB"}
                />
                Node Providers
              </Grid>
            </Button>
            <Button
              variant={visibleIndivisualHost ? "primaryShadow" : "normal"}
              px="2rem"
              justifySelf="center"
              type="submit"
              textTransform="capitalize"
              onClick={ProposalHandler}
            >
              <Grid alignItems="center" gridAutoFlow="column" gridGap=".5rem">
                <MemoHost
                  fill={visibleNodeProviderList ? "#55678B" : "#95A7CB"}
                />
                Individual Hosts
              </Grid>
            </Button>
          </Flex>
          <Grid
            gridGap="1rem"
            gridAutoFlow="column"
            justifyContent="end"
            alignItems="center"
          >
            <SearchField
              placeholder="Search"
              onChange={onChangeHandler}
              classNames="search-container"
            />
            <MemoListView
              fill={visibleListView ? "#139EEE" : "#95A7CB"}
              color={visibleListView ? "#139EEE" : "#95A7CB"}
              onClick={listViewHandler}
            />
            <MemoMapView
              fill={!visibleListView ? "#139EEE" : "#95A7CB"}
              color={!visibleListView ? "#139EEE" : "#95A7CB"}
              onClick={mapViewHandler}
            />
            <Button
              variant={!subscribe ? "greyBorder" : "secondary"}
              px="1rem"
              justifySelf="center"
              textTransform="capitalize"
              onClick={subscribeHandler}
            >
              <Grid
                alignItems="center"
                gridAutoFlow="column"
                gridGap=".5rem"
                fontSize="1.2rem"
                color={
                  !subscribe || !subscribedIndividual ? "grey.700" : "#129EED"
                }
                py=".2rem"
              >
                <MemoHeart
                  fill={
                    !subscribe || !subscribedIndividual ? "#95A7CB" : "#129EED"
                  }
                />
                Subscribed
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Box>
      {visibleNodeProviderList ? (
        <NodeProviders
          connect={connect}
          setConnect={setConnect}
          visibleListView={visibleListView}
          subscribe={subscribe}
          setSubscribe={setSubscribe}
        />
      ) : (
        <IndividualHost
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      )}
    </Box>
  );
};
