import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "2%",
    },
  },
  heading: {
    color: "red",
    fontSize: "1em",
    width: "50%",
    margin: "0 auto",
  },
}));

export default function TransactionForm() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Container>
        <div className={classes.heading}>Add Transaction</div>
        <Paper elevation={3}>
          <div>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              variant="outlined"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="outlined"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              variant="outlined"
            />
            <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="outlined"
            />
          </div>
        </Paper>
      </Container>
    </form>
  );
}
