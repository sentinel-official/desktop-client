import * as React from "react";

const Sort = (props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 4 8" fill="none" {...props}>
      <path d="M2 0L3.73205 3H0.267949L2 0Z" fill="#55678B" />
      <path d="M2 8L3.73205 5H0.267949L2 8Z" fill="#55678B" />
    </svg>
  );
};

const MemoSort = React.memo(Sort);
export default MemoSort;
