import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import MiniDrawer from "../components/Drawer";
import SettingsIcon from "@material-ui/icons/Settings";
import { FormLoader } from "../components/LoadingComponent";

import { getSetting } from "../utilities/ApiService";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  header: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(1),

    backgroundColor: "green",
    width: "20px",
  },
}));

export default function Setting() {
  const classes = useStyles();

  let [settingData, setSettingData] = useState({
    email: "",
    currency_id: "",
    theme: "",
  });

  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setSettingData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    setLoading(false);
    setError(false);
    setMessage("");
    async function fetchData() {
      let result = {};
      setLoading(true);
      setError(false);
      setMessage(false);
      console.log("lol");
      try {
        let userid = localStorage.getItem("userid");
        result = await getSetting(userid);
        setSettingData(result);
        console.log("after set: ", result);
        setError(false);
        setLoading(false);
      } catch (error) {
        console.log("err: ", error);
        setError(true);
        setMessage("Server Error, Please Try Again!");
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const resetData = () => {
    setSettingData({ email: "", password: "", currency_id: "", theme: "" });
  };
  const validateData = () => {
    if (!settingData.email) {
      setError(true);
      setMessage("Please enter valid email");
      return false;
    }

    if (!settingData.currency_id) {
      setError(true);
      setMessage("Please select valid Currency");
      return false;
    }
    if (!settingData.theme) {
      setError(true);
      setMessage("Please select valid theme");
      return false;
    }

    return true;
  };
  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    console.log(settingData);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) return;
    try {
      setSuccess(true);

      setError(false);
      setMessage("");
      // let result = await addUser(userData);
      let result;
      // console.log("result login", result);

      if (result && result.success !== 1) {
        setError(true);
        setMessage("user addition Falied");
        return;
      }

      if (result && result.success === 1) {
        // console.log("lol:", result.data);
        resetData();
        setError(false);
        setSuccess(true);
        setMessage("User Added Succesfully!");

        return;
      }
    } catch (err) {
      setError(true);
      setMessage("Error! please try again");
    }
  };
  const settingComponent = (
    <>
      {loading ? (
        <FormLoader></FormLoader>
      ) : (
        <>
          {" "}
          <div className={classes.header}>
            <h3> Settings </h3>
            <Avatar className={classes.avatar}>
              <SettingsIcon />
            </Avatar>
            {error === true ? (
              <Alert severity="error">{message}</Alert>
            ) : (
              <div></div>
            )}
            {success === true ? (
              <Alert severity="info">{message}</Alert>
            ) : (
              <div></div>
            )}
          </div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={submit}
          >
            <Grid className={classes.form} container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  value={settingData.email}
                  helperText="update email"
                  variant="outlined"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    native
                    id="currency_id"
                    value={settingData.currency_id}
                    onChange={handleInput}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>RS</option>
                    <option value={2}>USD</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    native
                    id="theme"
                    value={settingData.theme}
                    onChange={handleInput}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>Dark</option>
                    <option value={2}>Light</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br></br>
            <Button
              onClick={submit}
              type="submit"
              variant="outlined"
              color="primary"
              // className={classes.submit}
            >
              Update
            </Button>
            <br></br>
          </form>
        </>
      )}
    </>
  );
  return (
    <>
      <MiniDrawer props={settingComponent}></MiniDrawer>
    </>
  );
}
