import { memo, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const CustomNavLink = memo(({ children, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsActive(myRef.current && myRef.current.classList.contains("active"));
  }, [pathname]);

  const myRef = useRef(null);
  console.log(myRef);
  return (
    <NavLink ref={myRef} {...props}>
      {typeof children === "function" ? children(isActive) : children}
    </NavLink>
  );
});
