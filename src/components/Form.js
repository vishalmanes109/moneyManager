import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Form({ name }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>

        <form
          className={classes.form}
          noValidate
          //   onSubmit={submit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            //   value={loginData.name}
            autoFocus
            //   onChange={handleInput}
            //   onBlur={validateUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            //   value={loginData.name}
            //   onChange={handleInput}
            //   onBlur={validateUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            autoComplete="amount"
            //   value={loginData.name}
            //   onChange={handleInput}
            //   onBlur={validateUserName}
          />

          <FormControl variant="outlined" required fullWidth>
            <InputLabel>Transaction Type</InputLabel>
            <Select
              variant="outlined"
              margin="normal"
              //   value={state.age}
              //   onChange={handleChange}
              label="Transaction Type"
            >
              <option aria-label="None" value="" />
              <option value={"income"}>Income</option>
              <option value={"expense"}>Expense</option>
              <option value={"transfer"}>Transfer</option>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            //   value={loginData.name}
            //   onChange={handleInput}
            //   onBlur={validateUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            //   value={loginData.name}
            //   onChange={handleInput}
            //   onBlur={validateUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            //   value={loginData.password}
            //   onChange={handleInput}
            //   onBlur={validatePassword}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="agree"
                id="isAgree"
                color="primary"
                //   defaultChecked={agree.checked}
                //   onChange={(e) => setAgree({ checked: e.target.checked })}
              />
            }
            label="I am agreed to term and privacy policy."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="register" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      )
    </Container>
  );
}
