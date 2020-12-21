import { useState } from "react";

import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./Routes";

export const AuthGate = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <AuthenticatedRoutes />;
  }

  return <UnauthenticatedRoutes />;
};
