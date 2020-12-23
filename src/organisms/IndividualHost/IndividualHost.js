import { IndividualHostDetail } from "./molecules/IndividualHostDetail";
import { SubscribedIndividualHostDetail } from "./molecules/SubscribedIndividualHostDetail";

export const IndividualHost = ({
  connect,
  setConnect,
  visibleListView,
  subscribedIndividual,
  setSubscribedIndividual,
}) => {
  console.log("subscribedIndividual", subscribedIndividual);
  return (
    <>
      {subscribedIndividual ? (
        <SubscribedIndividualHostDetail
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      ) : (
        <IndividualHostDetail
          visibleListView={visibleListView}
          connect={connect}
          setConnect={setConnect}
          subscribedIndividual={subscribedIndividual}
          setSubscribedIndividual={setSubscribedIndividual}
        />
      )}
    </>
  );
};
