import { Grid, Text } from "atoms";
import { NodeHosterList } from "./NodeHosterList";

export const NodeHosterDetail = ({ setSubscribe }) => {
  return (
    <>
      <Grid
        py="1rem"
        pl="5rem"
        gridTemplateColumns="1fr  1fr 1fr 1fr "
        alignItems="center"
        borderBottom="1px solid"
        borderColor="border.500"
      >
        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          ID
        </Text>

        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          PLAN
        </Text>

        <Text as="span" color="text.500" fontSize="1.4rem" fontWeight="medium">
          VALIDITY
        </Text>

        <Text color="text.500" fontSize="1.4rem" fontWeight="medium">
          SUBSCRIBE
        </Text>
      </Grid>
      <Grid gridGap="1rem">
        {[1, 2, 3].map((index) => (
          <NodeHosterList key={index} setSubscribe={setSubscribe} />
        ))}
      </Grid>
    </>
  );
};
