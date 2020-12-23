import { SubscribedNodeProvider } from "organisms/SubscribedNodeProviders";
import { NodeProviderDetail } from "./molecules/NodeProviderDetail/NodeProviderDetail";

export const NodeProviders = ({
  connect,
  setConnect,
  visibleListView,
  subscribe,
  setSubscribe,
}) => {
  return (
    <>
      {subscribe ? (
        <SubscribedNodeProvider
          connect={connect}
          setConnect={setConnect}
          setSubscribe={setSubscribe}
        />
      ) : (
        <NodeProviderDetail
          visibleListView={visibleListView}
          connect={connect}
          setConnect={setConnect}
          setSubscribe={setSubscribe}
        />
      )}
    </>
  );
};
