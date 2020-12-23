const breakpoints = ["30em", "45em", "64em", "80em", "90em", "100em"];

const [sm, md, xm, lg, ml, xl] = breakpoints;
breakpoints.sm = sm;
breakpoints.md = md;
breakpoints.xm = xm;
breakpoints.lg = lg;
breakpoints.ml = ml;
breakpoints.xl = xl;

const space = [
  0,
  0.2,
  0.4,
  0.6,
  0.8,
  1,
  1.2,
  1.4,
  1.6,
  1.8,
  2,
  2.5,
  3,
  3.5,
  4,
  5,
  6,
  8,
  10,
  12,
  16,
  20,
].map((s) => `${s}rem`);

// #endregion
// #region typography
export const fontSets = [
  {
    name: "heading1",
    fontSize: "3.6rem",
    fontWeight: "normal",
  },
  {
    name: "heading2",
    fontSize: "3.4rem",
    fontWeight: "normal",
  },
  {
    name: "heading3",
    fontSize: "3.2rem",
    fontWeight: "normal",
  },
  {
    name: "heading4",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  {
    name: "heading5",
    fontSize: "2.8rem",
    // fontWeight: "bold",
  },
  {
    name: "heading6",
    fontSize: "2.6rem",
    // fontWeight: "bold",
  },
  {
    name: "heading7",
    fontSize: "2.4rem",
  },
  {
    name: "title",
    fontSize: "1.8rem",
    lineHeight: "1.8rem",
    fontWeight: "normal",
  },
  {
    name: "field",
    fontSize: "1.6rem",
    fontWeight: "normal",
  },
  {
    name: "body",
    fontSize: "1.4rem",
    fontWeight: "normal",
  },
  {
    name: "small",
    alias: "displaySm",
    fontSize: "1.2rem",
    fontWeight: "normal",
  },

  {
    name: "headingBold",
    fontSize: "2.8rem",
    fontWeight: "bold",
  },
  {
    name: "titleBold",
    fontSize: "1.8rem",
    fontWeight: "bold",
  },

  {
    name: "bigBody",
    fontSize: "1.6rem",
    fontWeight: "normal",
  },
  {
    name: "bigBodyBold",
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  {
    name: "bodyBold",
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
    fontWeight: "bold",
  },
  {
    name: "smallBold",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  {
    name: "verySmall",
    fontSize: "1rem",
    fontWeight: "normal",
  },
  {
    name: "button",
    fontSize: "1.6rem",
    fontWeight: "medium",
  },
  {
    name: "label",
    fontSize: "1.4rem",
    fontWeight: "medium",
  },
];
const fontMaps = fontSets.reduce(
  (
    fontMap,
    { name, alias = name, fontSize, lineHeight, fontWeight },
    index
  ) => {
    const fm = fontMap;
    fm.fontSizes[index] = fontSize;
    fm.fontSizes[name] = fontSize;
    fm.fontSizes[alias] = fontSize;
    fm.fontWeights[index] = fontWeight;
    fm.fontWeights[name] = fontWeight;
    fm.fontWeights[alias] = fontWeight;
    fm.lineHeights[name] = lineHeight;
    fm.lineHeights[alias] = lineHeight;
    return fm;
  },
  {
    fontFamily: {
      primary: "Roboto",
      secondary: "Overpass",
    },
    fontSizes: {},
    fontWeights: {
      normal: 300,
      semiBold: 400,
      medium: 500,
      bold: 900,
    },
    lineHeights: {},
  }
);
// #endregion
// #region colors
const colorSets = [
  {
    name: "primary",
    colors: [
      { name: 500, hex: "#129EED" },
      { name: 550, hex: "#139EEE" },
      { name: 600, hex: "#142E54" },
      { name: 700, hex: "#142D51" },
    ],
  },
  {
    name: "text",
    colors: [{ name: 500, hex: "#55678B" }],
  },
  {
    name: "grey",
    colors: [
      { name: 300, hex: "#AEB1B6" },
      { name: 400, hex: "#DEE9EF" },
      { name: 500, hex: "#8B99B5" },
      { name: 600, hex: "#E9F0F4" },
      { name: 700, hex: "#8EA1C8" },
      { name: 800, hex: "#EFF1F4" },
      { name: 900, hex: "#252E40" },
    ],
  },
  {
    name: "border",
    colors: [{ name: 500, hex: " #DCE9F1" }],
  },
  {
    name: "bg",
    colors: [
      { name: 500, hex: " #F6F8FB" },
      { name: 600, hex: " #e5f5fd" },
      { name: 700, hex: " #EDF5FA" },
    ],
  },
  {
    name: "green",
    colors: [{ name: 500, hex: " #31B24E" }],
  },
  {
    name: "warning",
    colors: [{ name: 500, hex: " #E3814A" }],
  },
  {
    name: "error",
    colors: [{ name: 500, hex: " #FF4B55" }],
  },
];
const colors = colorSets.reduce(
  (colorMap, { name, alias = name, colors: colorSet }) => {
    const color = {};
    const cm = colorMap;
    for (let colorIndex = 0; colorIndex < colorSet.length; colorIndex++) {
      const { name: colorName, hex } = colorSet[colorIndex];
      color[colorIndex] = hex;
      color[colorName] = hex;
    }
    cm[name] = color;
    cm[alias] = color;
    return cm;
  },
  {
    // ...defaultTheme.colors,
    white: "#FFFFFF",
    "white.0": "#FFFFFF",
    black: "#000000",
    "black.0": "#000000",
  }
);

// #endregion
const radii = {
  // ...defaultTheme.radii,
  small: "0.125rem",
  normal: "0.1875rem",
  large: "0.375rem",
  full: "10rem",
  square: 0,
};
const zIndices = {
  // ...defaultTheme.zIndices,
  modal: 2000,
  tooltip: 5000,
  toast: 7000,
};

const shadows = [
  { name: "none", shadow: undefined },
  { name: "sm", shadow: "0 .075rem .15rem rgba(0,0,0,.15)" },
  { name: "xl", shadow: "0 0 1rem rgba(0,0,0,.15)" },
].reduce(
  (shadowSet, { name, shadow }, index) => {
    const s = shadowSet;
    s[name] = shadow;
    s[index] = shadow;
    return s;
  }
  // { ...defaultTheme.shadows },
);

export const theme = {
  // ...defaultTheme,
  breakpoints,
  radii,
  colors,
  space,
  zIndices,
  shadows,
  ...fontMaps,
};
