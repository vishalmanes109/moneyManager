import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory } from "react-router-dom";
import { deleteTransaction } from "../utilities/ApiService";
import { DriveEtaOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: "0 auto",
    marginTop: theme.spacing(1.5),
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "90%",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: "10px",
    height: "auto",
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)",
  },
  item: {
    display: "inline",
  },
  button: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  },
}));

export default function TransactionMeta({ transactionData }) {
  const classes = useStyles();
  let [error, setError] = useState(false);
  let [message, setMessage] = useState("");
  let [info, setInfo] = useState(false);
  let history = useHistory();

  //
  const openCardMode = () => {
    history.push({
      pathname: "/transcard",
      state: { transactionData: transactionData },
    });
  };
  const deleteTransaData = () => {
    async function deleteData() {
      try {
        let result = await deleteTransaction(transactionData.id);

        if (result && result.status === 401) {
          setError(true);
          setMessage("Unauthorized Request, Login Again");
        }
        if (result && result.status === 400) {
          //
          setError(false);
          setInfo(true);
          setMessage("0 Transaction Found");
          return;
        }
        if (result && result.status === 500) {
          setError(true);
          //
          setMessage("Server Error");
          return;
        }
        if (result && result.status === 200 && result.data.success === 1) {
          //
          setInfo(true);
          setError(false);
          setMessage("Transaction deleted succesfully");
          //
          setTimeout(() => {
            history.push({
              pathname: "/search",
            });
          }, 3000);

          return;
        }
      } catch (err) {
        setError(true);
        setMessage("Server Error! Please try again");
      }
    }
    deleteData();
  };
  return (
    <div className={classes.container}>
      {error ? (
        <div> {message} </div>
      ) : (
        <div className={classes.listItem}>
          <div className={classes.item}>
            <h4 className={classes.item}>Title </h4>
            <div className={classes.item}>{transactionData.title}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Description </h4>
            <div className={classes.item}>{transactionData.description}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Mode of Payment: </h4>
            <div className={classes.item}>
              {transactionData.mode_of_payment}
            </div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>transaction Type: </h4>
            <div className={classes.item}>{transactionData.type}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Category: </h4>
            <div className={classes.item}>{transactionData.name}</div>
          </div>
          <div className={classes.buttons}>
            <Button variant="outlined" color="primary" onClick={openCardMode}>
              More
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteTransaData}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
