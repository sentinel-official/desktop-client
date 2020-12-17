import { Box, Grid, Text, Flex, CustomNavLink } from "atoms";
import MemoProfile from "assets/icons/Profile";
import MemoArrowBottom from "assets/icons/ArrowBottom";
import MemoLock from "assets/icons/Lock";
import MemoWallet from "assets/icons/Wallet";
import MemoActiveBorder from "assets/icons/ActiveBorder";
import MemoArrowLeft from "assets/icons/ArrowLeft";
import MemoArrowRight from "assets/icons/ArrowRight";
import useVisibleState from "hooks/useVisibleStates";

const sidebarLinks = [
  { Icon: MemoLock, name: "dVPN", url: "/dashboard/dVPN" },
  { Icon: MemoWallet, name: "Wallet", url: "/dashboard/wallet" },
];
export const Sidebar = () => {
  const { visible, toggle } = useVisibleState(true);

  return (
    <Box
      bg="primary.600"
      height="100vh"
      textAlign="center"
      width={visible ? "15vw" : "8rem"}
      transition="all 0.3s"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bg="primary.500"
        borderRadius="3rem"
        height="3rem"
        width="3rem"
        zIndex={2}
        right="-1.5rem"
        top="1.5rem"
        cursor="pointer"
        onClick={toggle}
      >
        {visible ? (
          <MemoArrowLeft height="1rem" fill="white" />
        ) : (
          <MemoArrowRight height="1rem" fill="white" />
        )}
      </Flex>
      <Box bg="white" p="2rem">
        <Grid
          gridAutoFlow="column"
          justifyContent="center"
          alignItems="center"
          gridGap={visible ? "1rem" : ".5rem"}
        >
          <MemoProfile height="2rem" width="2rem" />
          {visible && (
            <Text variant="field" fontWeight="medium" color="primary.700">
              Barry Allen
            </Text>
          )}
          <Box cursor="pointer">
            <MemoArrowBottom height="0.8rem" width="1rem" />
          </Box>
        </Grid>
      </Box>
      <Box>
        {sidebarLinks.map(({ Icon, name, url }) => (
          <CustomNavLink to={url}>
            {(isActive) => (
              <Grid
                gridTemplateColumns={visible ? "5rem 1fr" : "3rem 1fr"}
                alignItems="center"
              >
                {isActive ? (
                  <MemoActiveBorder
                    height="4.3rem"
                    width=".5rem"
                    alignSelf="start"
                  />
                ) : (
                  <Box width=".5rem" />
                )}
                <Flex alignItems="center" py="2rem">
                  <Icon
                    height="2rem"
                    width="2rem"
                    fill={isActive ? "white" : "#55678B"}
                  />
                  {visible && (
                    <Text
                      variant="field"
                      fontWeight="medium"
                      color={isActive ? "white" : "#55678B"}
                      px="2rem"
                    >
                      {name}
                    </Text>
                  )}
                </Flex>
              </Grid>
            )}
          </CustomNavLink>
        ))}
      </Box>
    </Box>
  );
};
