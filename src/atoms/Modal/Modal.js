import React from "react";

import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: 0,
    minWidth: "50rem",
    marginRight: "-50%",
    border: "0px",
    boxShadow: "0px 0px 25px rgba(196, 196, 196, 0.3)",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.30)",
    zIndex: 100,
  },
};

ReactModal.setAppElement("#root");

export const Modal = ({ isOpen, onClose, ...rest }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      {...rest}
    />
  );
};
