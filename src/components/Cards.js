import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  red: { backgroundColor: "#f05945", borderRadius: "16px" },
  green: { backgroundColor: "#98ddca", borderRadius: "16px" },
  blue: { backgroundColor: "#8fd6e1", borderRadius: "16px" },

  inline: { display: "inline" },
  card: {
    borderRadius: "16px",
  },
}));

let TransactionMeta = ({ name, total }) => {
  const classes = useStyles();

  if (total === null) total = 0;
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name.toUpperCase()}
        </Typography>
        <Typography variant="h6" component="h2">
          {total}₹
        </Typography>
      </CardContent>
    </Card>
  );
};

let RecentMeta = ({ transactionData }) => {
  const classes = useStyles();
  let history = useHistory();
  let [type, setType] = useState();
  let open = () => {
    console.log(transactionData);
    history.push({
      pathname: "/transcard",
      state: { transactionData: transactionData },
    });
    console.log(transactionData.title);
  };

  useEffect(() => {
    //  type = transactionData.transaction_type_id;
    setType(transactionData.transaction_type_id);

    if (transactionData.transaction_type_id === 1)
      transactionData.amount =
        " + " + transactionData.amount + transactionData.symbol;
    else if (transactionData.transaction_type_id === 2)
      transactionData.amount =
        " - " + transactionData.amount + transactionData.symbol;
    else if (transactionData.transaction_type_id === 3)
      transactionData.amount =
        " ~ " + transactionData.amount + transactionData.symbol;
    else transactionData.amount = " ~ " + transactionData.amount + "*";
  }, []);

  return (
    <ListItem
      className={
        transactionData.transaction_type_id === 1
          ? classes.green
          : transactionData.transaction_type_id === 2
          ? classes.red
          : classes.blue
      }
      button
      onClick={open}
    >
      <ListItemAvatar>
        <Avatar alt={`Avatar`} src={`/.jpg`} />
      </ListItemAvatar>
      <ListItemText
        primary={transactionData.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            ></Typography>
            {transactionData.description}
          </React.Fragment>
        }
      />{" "}
      <br></br>
      <ListItemSecondaryAction>
        <ListItemText id="2" primary={transactionData.amount} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { TransactionMeta, RecentMeta };
