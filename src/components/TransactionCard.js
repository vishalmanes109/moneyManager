import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import MiniDrawer from "../components/Drawer";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import "./UserCard.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // borderTop: "0.1px solid grey",
    borderRadius: "20px",
    boxShadow:
      "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)",
  },
  card: {
    // margin: "1%",
    // padding: "1%",
    width: "90%",
    alignItems: "left",
  },

  header: {
    width: "100%",
    // border: "2px solid red",
    maxWidth: "700px",
    fontSize: "20em",
    fontWeight: "900",
  },

  media: {
    maxWidth: "700px",
  },

  attribute: {
    display: "inline",
    fontSize: "1.2em",
  },
  data: {
    color: "grey",
    margin: "20px",
  },

  list: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function TransactionCard({ transactionDatar }) {
  const classes = useStyles();
  let transactionData = {};
  let [isEdit, setIsEdit] = useState(false);
  const edit = () => {
    setIsEdit(true);
  };
  let cardData = (
    <>
      <div className={classes.root}>
        {isEdit ? (
          <Redirect
            id={transactionData.id}
            to={{
              pathname: "/update",
              state: { transactionData: transactionData },
            }}
          ></Redirect>
        ) : (
          <>
            <h3>Transaction Details</h3>
            <br />
            <div className={classes.card}>
              <div className={classes.attribute}>
                <span>Title:</span>
                <span className={classes.data}>{transactionData.title}</span>
              </div>
              <br />
              <div className={classes.attribute}>
                <span>Description:</span>
                <span className={classes.data}>
                  {transactionData.description}
                </span>
              </div>
              <br />
              <div className={classes.attribute}>
                <span>Amount:</span>
                <span className={classes.data}>{transactionData.amount}</span>
              </div>
              <br />
              <div className={classes.attribute}>
                <span>Essential:</span>
                <span className={classes.data}>
                  {transactionData.essential}
                </span>
              </div>
              <br />
              <div className={classes.attribute}>
                <span>Transaction Type:</span>
                <span className={classes.data}>
                  {transactionData.transaction_type}
                </span>
              </div>
              <br />
              <div className={classes.attribute}>
                <span>Category:</span>
                <span className={classes.data}>{transactionData.category}</span>
              </div>
              <br />
              <br />
            </div>
            <div className={classes.buttons}>
              <Button
                //
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<EditIcon></EditIcon>}
                onClick={edit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                endIcon={<DeleteForeverIcon></DeleteForeverIcon>}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );

  return <MiniDrawer props={cardData}></MiniDrawer>;
}
