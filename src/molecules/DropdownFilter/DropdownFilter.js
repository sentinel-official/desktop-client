import React, { useCallback, useRef } from "react";
import MPopover from "@material-ui/core/Popover";
import styled from "styled-components";
import css from "@styled-system/css";

import { Flex } from "atoms/Flex";
import useVisibleState from "hooks/useVisibleStates";

export const Popover = styled(MPopover)(
  css({
    top: "1rem !important",
    ".MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded": {
      boxShadow: "0px 0px 22px rgba(196, 196, 196, 0.3)",
    },
  })
);

export const DropdownFilter = ({
  active,
  children,
  render,
  open,
  onClose,
  onOpen,
}) => {
  const { visible, show, hide } = useVisibleState(open);
  const ref = useRef(null);

  const onClick = useCallback(
    (e) => {
      if (typeof onOpen === "function") {
        onOpen();
      } else {
        show();
      }
      e.stopPropagation();
      e.preventDefault();
    },
    [show, onOpen]
  );

  const close = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      hide();
    }
  }, [hide, onClose]);

  return (
    <>
      <Popover
        open={open ?? visible}
        anchorEl={ref.current}
        onClose={close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClick={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
      >
        {render}
      </Popover>
      <Flex onClick={onClick} ref={ref} px="1.6rem" cursor="pointer">
        {children}
      </Flex>
    </>
  );
};
