import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

import { userLogin } from "../utilities/ApiService";
import MiniDrawer from "../components/Drawer";

import { isValidString, isValidPassword } from "../utilities/validator";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        MoneyManager
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    // if user is already logged in then redirect it to the dashboard
    let alreadyLogIn = localStorage.getItem("isLoggedIn");

    if (alreadyLogIn) {
      setRedirect(true);
    }
  }, []);

  const validatePassword = () => {
    //
    if (!isValidPassword(loginData.password)) {
      setError(true);
      setErrorMessage("Please Enter Valid Password");
      return;
    }
    setErrorMessage("");
    setError(false);
  };
  const validateUserName = () => {
    //
    if (!isValidString(loginData.name)) {
      setError(true);
      setErrorMessage("Please Enter Username");
      return;
    }
    setErrorMessage("");
    setError(false);
  };
  let handleInput = (e) => {
    const { id, value } = e.target;

    setLoginData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const submit = async (e) => {
    e.preventDefault();

    let { name, password } = loginData;
    if (!isValidString(name)) {
      setError(true);
      setErrorMessage("Please Enter Valid Name");
      return;
    }

    if (!isValidString(password)) {
      setError(true);
      setErrorMessage("Please Enter Password");
      return;
    }
    if (!isValidPassword(password)) {
      setError(true);
      setErrorMessage("Please Enter Valid Password");
      return;
    }

    try {
      setError(false);
      setErrorMessage("");
      let loginResult = await userLogin(loginData);

      // if login result is an empty object . so it is due to network error / server error
      if (
        loginResult &&
        Object.keys(loginResult).length === 0 &&
        loginResult.constructor === Object
      ) {
        setError(true);
        setErrorMessage("Server Error, Please Trya again later");
        return;
      }
      if (loginResult && loginResult.status !== 200) {
        setError(true);
        setErrorMessage("Username / Password is incorrect");
        return;
      }

      if (loginResult & (loginResult.data.success === 1)) {
        setLoginData({
          name: "",
          password: "",
        });

        setError(false);
        setErrorMessage("");
        setIsLogin(true);
        setTimeout(() => {
          setRedirect(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userName", loginData.name);
          localStorage.setItem("userid", loginData.userid);
          localStorage.setItem("token", loginResult.data.token);
        }, 3000);
        return;
      }
      setError(true);
      setErrorMessage("Username / Password is incorrect ");
    } catch (err) {
      setError(true);
      setErrorMessage("error");
    }
  };
  const focus = () => {
    setError(false);
    setErrorMessage("");
  };
  const logincomponent = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {redirect === true ? (
        <Redirect to="dashboard" />
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error === true ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <div></div>
          )}
          {isLogin === true ? (
            <Alert severity="success">
              Login Done! Redirecting In 3 Sec.....
            </Alert>
          ) : (
            <div></div>
          )}
          <form className={classes.form} noValidate onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              autoComplete="name"
              value={loginData.name}
              autoFocus
              onChange={handleInput}
              onBlur={validateUserName}
              onFocus={focus}
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
              value={loginData.password}
              autoComplete="current-password"
              onChange={handleInput}
              onFocus={focus}
              onBlur={validatePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onFocus={focus}
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
      )}

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
  return <MiniDrawer props={logincomponent}></MiniDrawer>;
}
