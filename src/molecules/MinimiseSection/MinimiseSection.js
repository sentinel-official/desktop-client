import { Grid, Box } from "atoms";
import MemoMinus from "assets/icons/Minus";
import MemoMinimise from "assets/icons/Minimise";
import MemoClose from "assets/icons/Close";

export const MinimiseSection = () => {
  return (
    <Grid
      gridAutoFlow="column"
      justifyContent="end"
      height="2.5rem"
      alignItems="center"
    >
      <Box px="1rem" pt=".5rem" bg="grey.800" cursor="pointer">
        <MemoMinus fill="#55678B" width="1rem" height="2rem" />
      </Box>
      <Box px="1rem" pt=".5rem" bg="grey.800" cursor="pointer">
        <MemoMinimise fill="#55678B" width="1rem" height="2rem" />
      </Box>
      <Box px="1rem" pt=".5rem" bg="grey.800" cursor="pointer">
        <MemoClose fill="#55678B" width="1rem" height="2rem" />
      </Box>
    </Grid>
  );
};
