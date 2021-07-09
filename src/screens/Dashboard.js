import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";
// import { PieChart } from "./Charts";

import { TransactionMeta, RecentMeta } from "../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { DashboardLoader } from "../components/LoadingComponent";

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
  let userId = localStorage.getItem("userid");
  let [netTransactiondata, setNetTransactiondata] = useState([]);
  let [recentTransactionData, setRecentTransactionData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Forget any past errors
        setError(false);
        let result = await getTotalTransactionForMonth(userId);

        console.log(" getTotalTransactionForMonth result: ", result);
        // if server error then result is empty object
        if (
          result &&
          Object.keys(result).length === 0 &&
          result.constructor === Object
        ) {
          // if result is empty
          setError(true);
          setLoading(false);
        }

        // if(result.length)
        setNetTransactiondata(result);

        let recentDataResult = await getRecentTransaction(userId);
        if (
          recentDataResult &&
          Object.keys(recentDataResult).length === 0 &&
          recentDataResult.constructor === Object
        ) {
          // if result is empty
          setError(true);
          setLoading(false);
        }
        setRecentTransactionData(recentDataResult);
        console.log("after set: ", recentDataResult);
      } catch (err) {
        console.log("err: lol", err);
        setError(true);
        setLoading(false);
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
      {loading ? (
        <DashboardLoader></DashboardLoader>
      ) : (
        <>
          {" "}
          {error ||
          (netTransactiondata.length < 0 && recentTransactionData) < 0 ? (
            <div> No Data Found </div>
          ) : (
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
          )}
        </>
      )}
    </>
  );
  return <MiniDrawer props={DashboardContent}></MiniDrawer>;
};

export default Dashboard;
