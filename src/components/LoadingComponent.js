import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: { maxWidth: "750px", margin: "0 auto" },
  card: {
    margin: "0 auto",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  chart: {
    margin: "5px",
    borderRadius: "1em",
  },
}));

let DashboardLoader = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.card}>
        <Skeleton
          animation="wave"
          className={classes.chart}
          variant="rect"
          width={250}
          height={120}
        />
        <Skeleton
          animation="wave"
          className={classes.chart}
          variant="rect"
          width={250}
          height={120}
        />
        <Skeleton
          animation="wave"
          className={classes.chart}
          variant="rect"
          width={250}
          height={120}
        />
        <Skeleton variant="text" />
      </div>
    </>
  );
};
let StatsLoader = () => {
  const classes = useStyles();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Skeleton variant="text" width="85%" height="10px" animation="wave" />
      <Skeleton variant="text" width="85%" height="3px" animation="wave" />

      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {Array.from(new Array(12)).map(
          (
            height = [80, 90, 50, 70, 23, 11, 100, 90, 70, 10, 100, 97, 60, 30],
            index
          ) => (
            <Skeleton
              animation="wave"
              className={classes.chart}
              variant="rect"
              width={5}
              height={height[Math.floor(Math.random() * height.length)]}
            />
          )
        )}
      </div>

      <Skeleton variant="text" width="80%" height="3px" animation="wave" />

      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {Array.from(new Array(12)).map(
          (
            height = [80, 90, 50, 70, 23, 11, 100, 90, 70, 10, 40, 20, 100],
            index
          ) => (
            <Skeleton
              animation="wave"
              className={classes.chart}
              variant="rect"
              width={5}
              height={height[Math.floor(Math.random() * height.length)]}
            />
          )
        )}{" "}
      </div>
      <Skeleton variant="text" width="80%" height="3px" animation="wave" />
      <br></br>
      <br></br>
      <Skeleton variant="circle" width={200} height={200} animation="wave" />
    </div>
  );
};
let FormLoader = () => {
  const classes = useStyles();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {Array.from(new Array(7)).map((item, index) => (
        <Skeleton variant="text" width="100%" height="80px" animation="wave" />
      ))}
    </div>
  );
};

export { DashboardLoader, StatsLoader, FormLoader };
