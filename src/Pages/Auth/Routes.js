import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LandingPage } from "../LandingPage";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Test } from "../Test";
import { AccountCreated } from "./AccountCreated/AccountCreated";
import { ConfigureSetting } from "../ConfigureSetting/ConfigureSetting";
import Dashboard from "../Dashboard";
// import { Loader } from "atoms";
// import { AuthContainer } from "pages/Auth/AuthContainer/AuthContainer";

export const UnauthenticatedRoutes = () => {
  return (
    <Suspense>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/account-created" component={AccountCreated} />
        <Route exact to="/sign-up" component={SignUp} />
        <Route path="/test" component={Test} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export const AuthenticatedRoutes = () => {
  return (
    <Suspense>
      <Switch>
        <Route path="/configure-setting" exact component={ConfigureSetting} />
        <Route path="/dashboard/wallet" exact component={Dashboard} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </Suspense>
  );
};
