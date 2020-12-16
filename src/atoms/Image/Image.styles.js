import styled, { css } from "styled-components";
import { Box } from "atoms/Box";

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ImageWrapper = styled(Box)`
  ${({ objectfit }) =>
    css`
      img {
        object-fit: ${objectfit || "initial"};
      }
    `}
`;
