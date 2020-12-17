import { Grid } from "atoms";
import { Sidebar } from "molecules/Sidebar";
import { useState } from "react";
import { Wallet } from "./Wallet";

const Dashboard = () => {
  const [isWalletVisible, setIsWalletVisible] = useState(true);
  return (
    <Grid gridTemplateColumns="auto 1fr ">
      <Sidebar />
      {isWalletVisible && <Wallet />}
    </Grid>
  );
};

export default Dashboard;
