import * as React from "react";

const Minus = (props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 1" fill="none" {...props}>
      <rect width="12" height="1" fill="#55678B" />
    </svg>
  );
};

const MemoMinus = React.memo(Minus);
export default MemoMinus;
