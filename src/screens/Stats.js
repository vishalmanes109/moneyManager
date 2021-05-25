import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";
// import { PieChart } from "./Charts";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { PieChart, BarChart, LineChart } from "../components/Charts";

import { getAllChartData } from "../utilities/ApiService";

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

  const [chartData, setChartData] = useState({
    pie: {},
    bar: {},
    heatmap: {},
    line: {},
  });

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        setError(null);
        let result = await getAllChartData(userId);
        setChartData(result);
        console.log("after set: ", chartData);
      } catch (err) {
        console.error(err);
        setError(error);
      }
      setLoading(false);
    }
    fetchChartData();
  }, []);

  let StatsContent = (
    <div style={{ maxWidth: "360px" }}>
      <div style={{ margin: "0 auto", width: "90%" }}>
        This is pie
        <PieChart data={chartData.pie}></PieChart>
      </div>

      <div style={{ margin: "0 auto", width: "90%" }}>
        This is bar
        <BarChart data={chartData.bar}></BarChart>
      </div>
      <div style={{ margin: "0 auto", width: "90%" }}>
        This is Line
        <LineChart data={chartData.line}></LineChart>
      </div>
    </div>
  );

  return <MiniDrawer props={StatsContent}></MiniDrawer>;
};

export default Dashboard;
