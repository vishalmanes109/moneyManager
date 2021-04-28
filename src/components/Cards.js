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
  root: {
    minWidth: 275,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

let TransactionMeta = ({ name, total }) => {
  const classes = useStyles();
  console.log(total);
  if (total === null) total = 0;
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h6" component="h2">
          {total}₹
        </Typography>
      </CardContent>
    </Card>
  );
};

let RecentMeta = () => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt={`Avatar`} src={`/.jpg`} />
      </ListItemAvatar>
      <ListItemText id="1" primary={`Line item `} />
      <ListItemSecondaryAction></ListItemSecondaryAction>
    </ListItem>
  );
};

export { TransactionMeta, RecentMeta };
