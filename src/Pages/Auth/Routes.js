import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LandingPage } from "pages/LandingPage";
import { CreateAccount } from "pages/CreateAccount";
import { Login } from "pages/Login";
import { Test } from "pages/Test";
import { AccountCreated } from "pages/Auth/AccountCreated";
import { ConfigureSetting } from "pages/ConfigureSetting";
import Dashboard from "pages/Dashboard";
// import { Loader } from "atoms";

export const UnauthenticatedRoutes = () => {
  return (
    <Suspense>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route exact to="/create-account" component={CreateAccount} />
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
        <Route exact path="/account-created" component={AccountCreated} />
        <Route path="/dashboard/wallet" exact component={Dashboard} />
        <Route path="/dashboard/dVPN" exact component={Dashboard} />
        <Redirect to="/account-created" />
      </Switch>
    </Suspense>
  );
};
