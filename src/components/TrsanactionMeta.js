import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
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
    backgroundColor: "white",
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
    margin: "2px",
  },
}));

export default function TransactionMeta({ transactionData }) {
  const classes = useStyles();
  let [isMore, setIsMore] = useState(false);
  let call = "tel:";

  //console.log("user from meta:", user.name);
  const openCardMode = () => {
    setIsMore(true);
    //console.log(user);
  };
  return (
    <div className={classes.container}>
      {isMore ? (
        <Redirect
          user={transactionData}
          to={{
            pathname: "/userdetail",
            state: { transactionData: transactionData },
          }}
        ></Redirect>
      ) : (
        <div className={classes.listItem}>
          <div className={classes.item}>
            <h4 className={classes.item}>Personal No </h4>
            <div className={classes.item}>{1}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Name: </h4>
            <div className={classes.item}>{}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Address: </h4>
            <div className={classes.item}>{1}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>DOB: </h4>
            <div className={classes.item}>{1}</div>
          </div>
          <div className={classes.item}>
            <h4 className={classes.item}>Contact No: </h4>
            <div className={classes.item}>{1}</div>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={openCardMode}
              endIcon={<Icon>more</Icon>}
            >
              More
            </Button>
            <a href={call}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<Icon>call</Icon>}
              >
                Call
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
