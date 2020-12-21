import React, { forwardRef } from "react";

import { Box } from "../Box";

export const Text = forwardRef(({ as, children, ...rest }, ref) => {
  return (
    <Box as={as} ref={ref} {...rest}>
      {children}
    </Box>
  );
});
Text.defaultProps = {
  as: "div",
  children: "",
  // color: "gray.900",
};
