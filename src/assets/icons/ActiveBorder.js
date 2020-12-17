import * as React from "react";

const ActiveBorder = (props) => {
  return (
    <svg width="auto" height="auto" viewBox="0 0 4 35" fill="none" {...props}>
      <path
        d="M0 0.724609C2.20914 0.724609 4 2.51547 4 4.72461V30.7246C4 32.9338 2.20914 34.7246 0 34.7246V0.724609Z"
        fill="#139EEE"
      />
    </svg>
  );
};

const MemoActiveBorder = React.memo(ActiveBorder);
export default MemoActiveBorder;
