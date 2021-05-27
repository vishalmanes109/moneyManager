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
      marginBottom: "-60px",
    },
    width: "100%",
  },
  navbar: {
    background: "grey",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "2em",
  },
}));

export default function GroupSizesColors() {
  const classes = useStyles();

  return (
    <div>
      <ButtonGroup className={classes.navbar} size="large" color="primary">
        <div>
          <Link style={{ textDecoration: "none" }} to="dashboard">
            <Button>DashBoard</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="login">
            <Button>Login</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="register">
            <Button>Signup</Button>
          </Link>
        </div>
      </ButtonGroup>
    </div>
  );
}
