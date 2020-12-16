import styled, { css } from "styled-components";

import {
  color,
  layout,
  grid,
  space,
  position,
  background,
  border,
  shadow,
  typography,
  flexbox,
  system,
  variant,
} from "styled-system";
import { fontSets } from "../../utils/styles/theme";

const whiteSpace = system({
  whiteSpace: {
    property: "whiteSpace",
  },
  wordBreak: {
    property: "wordBreak",
  },
  fontFamily: {
    property: "fontFamily",
    scale: "fontFamily",
  },
});

const variants = fontSets.reduce((fontMap, { name }) => {
  const fm = fontMap;
  fm[name] = {
    fontSize: name,
    lineHeight: name,
    fontWeight: name,
  };
  return fm;
}, {});

// const fontNames = fontSets.map((f) => f.name);

export const Box = styled.div`
  position: relative;
  ${space}
  ${color}
  ${layout}
  ${background}
  ${position}
  ${grid}
  ${border}
  ${flexbox}
  ${shadow}
  ${variant({
    variants,
  })}
  ${typography}
  ${whiteSpace}
  ${({ cursor }) =>
    cursor &&
    css`
      cursor: ${cursor};
    `}
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `}
  ${({ textDecoration }) =>
    textDecoration &&
    css`
      text-decoration: ${textDecoration};
    `}
  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `}
  ${({ firstLetterCapital }) =>
    firstLetterCapital &&
    css`
      &::first-letter {
        text-transform: uppercase;
      }
    `}
`;
