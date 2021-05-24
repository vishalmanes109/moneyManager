import React from "react";
import { Pie } from "react-chartjs-2";
import { Bar, Line } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
  // maintainAspectRatio: false,
};

let PieChart = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Pie width={10} height={0} data={data} />
      </div>
    </>
  );
};
let BarChart = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Bar data={data} options={options} />
    </div>
  );
};

let HeatMap = () => {
  const classes = useStyles();

  return <div>Heatmap</div>;
};
let LineChart = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Line data={data} options={options} />
    </div>
  );
};

export { PieChart, BarChart, HeatMap, LineChart };
//  export default PieChart;
