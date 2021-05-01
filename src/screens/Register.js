import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { userRegistration, isUserNameAvailable } from "../utilities/ApiService";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

import {
  isValidString,
  isValidPassword,
  isValidEmail,
} from "../utilities/validator";
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
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState({
    checked: false,
  });
  const [isRegister, setIsRegister] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const isUsernameAvailable = async () => {
    setErrorMessage("");
    setError(false);
    if (registerData.name.length < 1) {
      setErrorMessage("Please Enter Valid Username");
      setError(true);
      return;
    }
    let result = await isUserNameAvailable(registerData.name);
    if (result.success !== 1) {
      setErrorMessage("Username Is Not Available!");
      setError(true);
    }
  };
  const validateEmail = () => {
    console.log("lol", registerData.email);

    if (!isValidEmail(registerData.email)) {
      setError(true);
      setErrorMessage("Please Enter Valid Email Id");
      return;
    }
    setErrorMessage("");
    setError(false);
  };

  const validatePassword = () => {
    console.log("lol", registerData.password);
    if (!isValidPassword(registerData.password)) {
      setError(true);
      setErrorMessage("Please Enter Valid Password");
      return;
    }
    setErrorMessage("");
    setError(false);
  };

  const HandleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setRegisterData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (agree.checked === false) {
      setError(true);
      setErrorMessage("Please Agree To Terms & Privacy Policy");

      return;
    }
    let { name, email, password, confirmPassword } = registerData;
    if (!isValidString(name)) {
      setError(true);
      setErrorMessage("Please Enter Valid Name");
      return;
    }
    if (!isValidEmail(email)) {
      setError(true);
      setErrorMessage("Please Enter Valid Email Id");
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
    if (password !== confirmPassword) {
      console.log(password);
      console.log(confirmPassword);
      setError(true);
      setErrorMessage("Password & Confirm Password Does Not Match");
      return;
    }

    try {
      setError(false);
      setErrorMessage("");
      let registrationResult = await userRegistration(registerData);
      if (registrationResult.status !== 200) {
        setError(true);
        setErrorMessage("Registration Falied");
        return;
      }
      if (registrationResult.data.success === 1) {
        console.log("lol:", registrationResult.data);
        setRegisterData({
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
        });

        setError(false);
        setErrorMessage("");
        setIsRegister(true);
        setTimeout(() => {
          setRedirect(true);
          localStorage.setItem("isLoggedIn", false);
          localStorage.setItem("userName", registerData.name);
        }, 3000);
        return;
      }
      // setError(true);
      // setErrorMessage("Registration Failed! Try Again");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("error");
    }
  };

  const classes = useStyles();

  return (
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
            Sign up
          </Typography>
          {error === true ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <div></div>
          )}
          {isRegister === true ? (
            <Alert severity="success">
              registration Done! Redirecting In 3 Sec.....
            </Alert>
          ) : (
            <div></div>
          )}
          <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  value={registerData.name}
                  autoFocus
                  onChange={HandleInput}
                  onBlur={isUsernameAvailable}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={registerData.email}
                  autoComplete="email"
                  onChange={HandleInput}
                  onBlur={validateEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={registerData.password}
                  autoComplete="current-password"
                  onChange={HandleInput}
                  onBlur={validatePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={registerData.confirmPassword}
                  autoComplete="current-password"
                  onChange={HandleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isAgree"
                      defaultChecked={agree.checked}
                      onChange={(e) => setAgree({ checked: e.target.checked })}
                      color="primary"
                    />
                  }
                  label="I accept terms and privacy policy"
                />
              </Grid>
            </Grid>
            <Button
              onClick={submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
