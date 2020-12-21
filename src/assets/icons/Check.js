import * as React from "react";

const Check = (props) => {
  return (
    <svg width="auto" height="auto" viewBox="0 0 44 39" fill="none" {...props}>
      <path
        d="M19.1998 38.2002L0.799805 21.3002L4.2998 17.5002L18.3998 30.4002L38.7998 0.700195L43.0998 3.7002L19.1998 38.2002Z"
        fill="#1AB132"
      />
    </svg>
  );
};

const MemoCheck = React.memo(Check);
export default MemoCheck;
