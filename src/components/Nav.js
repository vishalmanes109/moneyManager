import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./charts.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function GroupSizesColors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Link style={{ textDecoration: "none" }} to="dashboard">
          <Button>DashBoard</Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="login">
          <Button>Login</Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="register">
          <Button>Signup</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}
