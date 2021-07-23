import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";
// import { PieChart } from "./Charts";

import { TransactionMeta, RecentMeta } from "../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  getRecentTransaction,
  getTotalTransactionForMonth,
} from "../utilities/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: { maxWidth: "750px", margin: "0 auto" },
  card: { margin: "0 auto" },
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  let userId = 1;
  const Icon = [
    "DashboardIcon",
    "AccountBoxIcon",
    "PollIcon",
    "SettingsApplicationsIcon",
  ];
  let props = {
    selectorComponent: DashboardContent,
    icon: Icon,
  };
  let DashboardContent = (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {netTransactiondata.map((transaction) => (
            <Grid className={classes.card} item xs={12} sm={3}>
              <TransactionMeta
                name={transaction.name}
                total={transaction.total}
              ></TransactionMeta>
            </Grid>
          ))}
        </Grid>
      </div>
      <br />
      <br></br>
      <div className={classes.list}>
        Recent Transaction
        {recentTransactionData.map((transaction) => (
          <RecentMeta
            title={transaction.title}
            amount={transaction.amount}
            type={transaction.transaction_type_id}
            description={transaction.description}
            symbol={transaction.symbol}
          ></RecentMeta>
        ))}
      </div>
    </>
  );

  let [netTransactiondata, setNetTransactiondata] = useState([]);
  let [recentTransactionData, setRecentTransactionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Forget any past errors
        setError(null);
        let result = await getTotalTransactionForMonth(userId);
        //
        setNetTransactiondata(result);
        let recentDataResult = await getRecentTransaction(userId);
        setRecentTransactionData(recentDataResult);
      } catch (err) {
        console.error(err);
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return <MiniDrawer {...props}></MiniDrawer>;
};

export default Dashboard;
