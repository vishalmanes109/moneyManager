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
        console.log(" getTotalTransactionForMonth result: ", result);
        setNetTransactiondata(result);
        let recentDataResult = await getRecentTransaction(userId);
        setRecentTransactionData(recentDataResult);
        console.log("after set: ", recentDataResult);
      } catch (err) {
        console.error(err);
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const showTransaction = (id) => {
    // redirect to the show transaction page
    console.log("transId", id);
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
          <div
            onClick={() => {
              showTransaction(transaction.id);
            }}
          >
            <RecentMeta
              title={transaction.title}
              amount={transaction.amount}
              type={transaction.transaction_type_id}
              description={transaction.description}
              symbol={transaction.symbol}
            ></RecentMeta>
          </div>
        ))}
      </div>
    </>
  );

  return <MiniDrawer props={DashboardContent}></MiniDrawer>;
};

export default Dashboard;
