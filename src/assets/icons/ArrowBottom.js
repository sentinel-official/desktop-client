import * as React from "react";

const ArrowBottom = (props) => {
  return (
    <svg width="auto" height="auto" viewBox="0 0 12 7" fill="none" {...props}>
      <path
        d="M11.7223 0.572972C11.5352 0.385832 11.2545 0.385832 11.0673 0.572972L6.36544 5.71933L1.66354 0.572972C1.4764 0.385832 1.19569 0.385832 1.00855 0.572972C0.844805 0.73672 0.844805 1.04082 1.00855 1.22796L6.01456 6.72521C6.10813 6.81878 6.24848 6.86556 6.36544 6.86556C6.48241 6.86556 6.62276 6.84217 6.71633 6.72521L11.7223 1.22796C11.8861 1.04082 11.8861 0.73672 11.7223 0.572972Z"
        fill="#142D51"
      />
    </svg>
  );
};

const MemoArrowBottom = React.memo(ArrowBottom);
export default MemoArrowBottom;
