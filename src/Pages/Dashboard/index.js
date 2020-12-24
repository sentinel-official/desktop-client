import { Grid } from "atoms";
import { Sidebar } from "molecules/Sidebar";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Dvpn } from "./Dvpn";
import { Wallet } from "./Wallet";

const Dashboard = () => {
  const [connect, setConnect] = useState(false);
  return (
    <Grid gridTemplateColumns="auto 1fr ">
      <Sidebar connect={connect} setConnect={setConnect} />
      <Switch>
        <Route path="/dashboard/wallet" component={Wallet} />
        <Route
          path="/dashboard/dVPN"
          component={() => <Dvpn connect={connect} setConnect={setConnect} />}
        />
      </Switch>
    </Grid>
  );
};

export default Dashboard;
