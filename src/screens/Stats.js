import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";

import { PieChart, BarChart, LineChart } from "../components/Charts";

import { getAllChartData } from "../utilities/ApiService";

import { StatsLoader } from "../components/LoadingComponent";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   list: { maxWidth: "750px", margin: "0 auto" },
//   card: { margin: "0 auto" },
// }));

const Dashboard = () => {
  let userId = 1;
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
        setError(false);
        let result = await getAllChartData(userId);
        setChartData(result);

        if (
          (result.pie &&
            Object.keys(result.pie).length === 0 &&
            result.pie.constructor === Object) ||
          (result.bar &&
            Object.keys(result.bar).length === 0 &&
            result.bar.constructor === Object) ||
          (result.line &&
            Object.keys(result.line).length === 0 &&
            result.line.constructor === Object)
        ) {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchChartData();
  }, []);

  let StatsContent = (
    <>
      {loading ? (
        <StatsLoader></StatsLoader>
      ) : (
        <>
          {" "}
          {error ? (
            <div>No data found or error</div>
          ) : (
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
          )}
        </>
      )}
    </>
  );
  return <MiniDrawer props={StatsContent}></MiniDrawer>;
};

export default Dashboard;
