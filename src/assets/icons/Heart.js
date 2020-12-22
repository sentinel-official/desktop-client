import * as React from "react";

const Heart = (props) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 11" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.38293 0.902914C4.19979 -0.296754 2.28089 -0.296087 1.09848 0.902836L1.00309 0.999563C-0.334449 2.35578 -0.334011 4.55509 1.00229 5.91007L4.65531 9.61411C5.37562 10.3445 6.54466 10.3433 7.26376 9.61411L10.9168 5.91007C12.2539 4.55429 12.2542 2.35647 10.916 0.999563L10.8206 0.902836C9.63749 -0.296789 7.71983 -0.297315 6.53614 0.902914L6.61077 0.827236C6.2511 1.19193 5.66857 1.19254 5.3083 0.827236L5.38293 0.902914Z"
        fill="#95A7CB"
      />
    </svg>
  );
};

const MemoHeart = React.memo(Heart);
export default MemoHeart;
