import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";
// import { PieChart } from "./Charts";

import { TransactionMeta, RecentMeta } from "../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { PieChart } from "../components/Charts";

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
  //   let [netTransactiondata, setNetTransactiondata] = useState([]);
  //   let [recentTransactionData, setRecentTransactionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoading(true);
        // // Forget any past errors
        // setError(null);
        // let result = await getTotalTransactionForMonth(userId);
        // // console.log("result: ", result);
        // setNetTransactiondata(result);
        // let recentDataResult = await getRecentTransaction(userId);
        // setRecentTransactionData(recentDataResult);
        // console.log("after set: ", recentDataResult);
      } catch (err) {
        // console.error(err);
        // setError(error);
      }
      //   setLoading(false);
    }
    fetchData();
  }, []);

  let StatsContent = (
    <>
      <div style={{ margin: "0 auto", width: "90%" }}>
        This is stats
        <PieChart></PieChart>
      </div>
    </>
  );

  return <MiniDrawer props={StatsContent}></MiniDrawer>;
};

export default Dashboard;
