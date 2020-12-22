import { Grid } from "atoms";
import { Sidebar } from "molecules/Sidebar";
import { Route, Switch } from "react-router-dom";
import { Dvpn } from "./Dvpn";
import { Wallet } from "./Wallet";

const Dashboard = () => {
  return (
    <Grid gridTemplateColumns="auto 1fr ">
      <Sidebar />
      <Switch>
        <Route path="/dashboard/wallet" component={Wallet} />
        <Route path="/dashboard/dVPN" component={Dvpn} />
      </Switch>
    </Grid>
  );
};

export default Dashboard;
