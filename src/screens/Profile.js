import React, { useState, useEffect } from "react";
import MiniDrawer from "../components/Drawer";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Avatar, Grid } from "@material-ui/core";
import { TransactionMeta, RecentMeta } from "../components/Cards";
import { DashboardLoader, ProfileLoader } from "../components/LoadingComponent";
import imgAv from "../1.png";
import {
  getRecentTransaction,
  getTotalTransactionForMonth,
  getUserById,
} from "../utilities/ApiService";

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
  let userId = localStorage.getItem("userid");
  let [netTransactiondata, setNetTransactiondata] = useState([]);
  let [recentTransactionData, setRecentTransactionData] = useState([]);
  let [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Forget any past errors
        setError(false);
        let userResult = await getUserById(userId);
        if (
          userResult &&
          Object.keys(userResult).length === 0 &&
          userResult.constructor === Object
        ) {
          // if result is empty
          setError(true);
          setLoading(false);
        }
        setUserData(userResult);

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

  let ProfileComponent = (
    <>
      {loading ? (
        <ProfileLoader></ProfileLoader>
      ) : (
        <>
          <Grid container spacing={3}>
            {" "}
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper} elevation={3}>
                <img className={classes.avatar} alt="Profile" src={imgAv} />
                <div className={classes.info}>
                  {userData.length < 1 ? (
                    <>
                      <div>Failed to fetch user data</div>
                    </>
                  ) : (
                    <>
                      <div>Email:{userData.email}</div>
                      <div>Account created on :{userData.date}</div>
                      <div>Name:{userData.name} </div>
                      <div>Currency:{userData.currency}</div>
                      <div>Theme:{userData.theme}</div>
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
                    </>
                  )}
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
                <>
                  <>
                    {" "}
                    {error ||
                    (netTransactiondata.length < 0 && recentTransactionData) <
                      0 ? (
                      <div> No Data Found </div>
                    ) : (
                      <>
                        <div className={classes.root}>
                          <Grid container spacing={3}>
                            {netTransactiondata.map((transaction) => (
                              <Grid
                                className={classes.card}
                                item
                                xs={12}
                                sm={3}
                              >
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
                </>
                {/* 
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
            </Grid> */}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
  return (
    <>
      <MiniDrawer props={ProfileComponent}></MiniDrawer>
    </>
  );
}
