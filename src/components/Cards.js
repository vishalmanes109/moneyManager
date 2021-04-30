import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  // root: {
  //   minWidth: 275,
  //   width: "100%",
  //   backgroundColor: theme.palette.background.paper,
  //   display: "flex",
  //   flexWrap: "wrap",
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: theme.spacing(16),
  //     height: theme.spacing(16),
  //   },
  // },
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
  console.log(total);
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

let RecentMeta = ({ title, amount, type, description, symbol }) => {
  const classes = useStyles();
  if (type === 1) amount = " + " + amount + symbol;
  if (type === 2) amount = " - " + amount + symbol;
  if (type === 3) amount = " ~ " + amount + symbol;

  return (
    <ListItem
      className={
        type === 1 ? classes.green : type === 2 ? classes.red : classes.blue
      }
      button
    >
      <ListItemAvatar>
        <Avatar alt={`Avatar`} src={`/.jpg`} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            ></Typography>
            {description}
          </React.Fragment>
        }
      />{" "}
      <br></br>
      <ListItemSecondaryAction>
        <ListItemText id="2" primary={amount} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { TransactionMeta, RecentMeta };
