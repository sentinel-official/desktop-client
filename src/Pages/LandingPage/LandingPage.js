import styled from "styled-components";
import { Box, Grid, Text } from "atoms";
import ProgressBar from "@ramonak/react-progress-bar";
// import hexToRgba from "hex-to-rgba";
import MemoLogo from "assets/icons/Logo";
import MemoSentinel from "assets/icons/Sentinel";

const BoxStyle = styled(Box)`
  background-image: radial-gradient(#142e54, #142d51);
`;

const StyledProgress = styled(Box)`
  span {
    display: none;
  }
`;

export const LandingPage = () => {
  return (
    <BoxStyle width="100vw" height="100vh">
      <Grid justifyContent="center" alignItems="center" height="100vh">
        <Grid gridAutoFlow="column" justifyContent="center" gridGap="2rem">
          <MemoLogo height="6rem" fill="primary.500" />
          <MemoSentinel width="20rem" height="6rem" fill="primary.500" />
        </Grid>
      </Grid>
      <Box
        position="absolute"
        m="auto"
        bottom="5rem"
        left={0}
        right={0}
        textAlign="center"
      >
        <Text
          variant="body"
          color="white"
          opacity="0.4"
          textTransform="uppercase"
        >
          PREPARING THE SENTINEL CLIENT
        </Text>
      </Box>

      <StyledProgress
        position="absolute"
        width="100%"
        border="2px solid"
        borderColor="primary.600"
        p="2px"
        bottom="0rem"
      >
        <ProgressBar
          bgcolor="#129EED"
          height="0.8rem"
          borderRadius="0px"
          baseBgColor="#143f6b"
          completed={80}
        />
      </StyledProgress>
    </BoxStyle>
  );
};
