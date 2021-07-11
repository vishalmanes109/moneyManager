import React from "react";
import MiniDrawer from "../components/Drawer";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { TransactionMeta, RecentMeta } from "../components/Cards";

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
    padding: "0.5em",
    margin: "1em",
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

export default function Profile() {
  let classes = useStyles();
  let ProfileComponent = (
    <>
      <Grid container spacing={3}>
        {" "}
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.avatar}></div>
            <div className={classes.info}>
              <div>Email:Vishal Mane</div>
              <div>Account created on :7/10/2021</div>
              <div>Name:Vishal Mane</div>
              <div>Currency:RS</div>
              <div>Theme:Default</div>
              <div className={classes.button}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Paper>

          <br></br>
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.info}>
              <div>Total Transactions:0</div>
              <div>Avg Earning per month :2000</div>
              <div>Avg Expense per month :2000</div>
              <div>Avg saving per month :2000</div>
              <div>Name:Vishal Mane</div>
              <div>Currency:RS</div>
              <div>Theme:Default</div>
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
  return (
    <>
      <MiniDrawer props={ProfileComponent}></MiniDrawer>
    </>
  );
}
