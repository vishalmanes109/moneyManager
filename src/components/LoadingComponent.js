import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { TransactionMeta } from "../components/Cards";

const useStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: "50%",
    borderColor: "red",
    width: "200px",
    height: "200px",
    padding: "1em",
    margin: "1em",
    boxShadow: "0 0 50px #ccc",
  },
  paper: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: "0.5em",
    margin: "0.5em",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  // const classes = useStyles();

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
let ProfileLoader = () => {
  let classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {" "}
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.avatar}> </div>
            <div className={classes.info}>
              {Array.from(new Array(7)).map((item, index) => (
                <Skeleton
                  variant="text"
                  width="280px"
                  height="20px"
                  animation="wave"
                />
              ))}
            </div>
          </Paper>

          <br></br>
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.info}>
              {Array.from(new Array(7)).map((item, index) => (
                <Skeleton
                  variant="text"
                  width="280px"
                  height="20px"
                  animation="wave"
                />
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} lg={9}>
          <Paper elevation={3}>
            <Grid item xs={12} sm={3}>
              {" "}
              <TransactionMeta name="income" total="2000"></TransactionMeta>
            </Grid>
            <Grid item xs={12} sm={3}>
              {" "}
              <TransactionMeta name="Expense" total="2000"></TransactionMeta>
            </Grid>
            <Grid item xs={12} sm={3}>
              {" "}
              <TransactionMeta name="Transafer" total="2000"></TransactionMeta>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export { DashboardLoader, StatsLoader, FormLoader, ProfileLoader };
