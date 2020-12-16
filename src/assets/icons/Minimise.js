import * as React from "react";

function Minimise(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 11" fill="none" {...props}>
      <rect y="10" width="10" height="1" fill="#55678B" />
      <rect
        x="1"
        y="2"
        width="9"
        height="1"
        transform="rotate(90 1 2)"
        fill="#55678B"
      />
      <rect y="2" width="10" height="1" fill="#55678B" />
      <rect x="2" width="10" height="1" fill="#55678B" />
      <rect x="9" y="8" width="3" height="1" fill="#55678B" />
      <rect
        x="3"
        width="3"
        height="1"
        transform="rotate(90 3 0)"
        fill="#55678B"
      />
      <rect
        x="10"
        y="2"
        width="9"
        height="1"
        transform="rotate(90 10 2)"
        fill="#55678B"
      />
      <rect
        x="12"
        width="9"
        height="1"
        transform="rotate(90 12 0)"
        fill="#55678B"
      />
    </svg>
  );
}

const MemoMinimise = React.memo(Minimise);
export default MemoMinimise;
