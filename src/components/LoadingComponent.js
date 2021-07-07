import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
      <Skeleton variant="text" width="80%" animation="wave" />
      <br></br>
      <Skeleton variant="circle" width={250} height={250} animation="wave" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "23px",
        }}
      >
        {Array.from(new Array(12)).map((item, index) => (
          <Skeleton
            animation="wave"
            className={classes.chart}
            variant="rect"
            width={10}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export { DashboardLoader, StatsLoader };
