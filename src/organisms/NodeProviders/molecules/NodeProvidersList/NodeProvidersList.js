import { Grid, Text, Flex } from "atoms";
import useVisibleState from "hooks/useVisibleStates";
import styled from "styled-components";
import { NodeHosterDetail } from "../NodeHosterDetail/";

const TextStyle = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`;

export const NodeProvidersList = ({ setSubscribe }) => {
  const { visible, toggle } = useVisibleState(true);
  return (
    <>
      <Grid
        py="1.5rem"
        px="3rem"
        gridTemplateColumns="1fr  10rem 1fr 1fr 1fr"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
        // maxHeight="80vh"
        // className="scroll-bar"
      >
        <Flex alignItems="center">
          <Text color="primary.700" fontSize="1.4rem" fontWeight="medium">
            ABC Node Hosters
          </Text>
        </Flex>

        <Text color="primary.700" fontSize="1.4rem">
          3
        </Text>
        <TextStyle
          color="primary.500"
          fontSize="1.4rem"
          fontWeight="semiBold"
          cursor="pointer"
        >
          abc.vpn
        </TextStyle>

        <Text color="primary.700" fontSize="1.4rem" className="truncate-text">
          Lorem ipsum dolarvslksdlkg sdfklsdlgkjsdlkgj sglksdglkjsldgjkd
        </Text>

        <Text
          color="grey.700"
          fontSize="1.4rem"
          cursor="pointer"
          fontWeight="medium"
          onClick={toggle}
          textAlign="center"
        >
          {visible ? "View" : "Close"}
        </Text>
      </Grid>
      {!visible && <NodeHosterDetail setSubscribe={setSubscribe} />}
    </>
  );
};
