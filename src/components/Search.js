import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Redirect } from "react-router-dom";
import TransactionMeta from "../components/TrsanactionMeta";
import MiniDrawer from "../components/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

    // backgroundColor: "green",
    width: "150px",
  },
  container: {
    width: "95%",
    margin: "0 auto",
  },
}));

export default function UserForm() {
  const classes = useStyles();

  let [userData, setUserData] = useState({
    name: "",
    pno: "",
    address: "",
    gender: "",
    groupIncharge: "",
    status: "",
    bloodGroup: "",
  });

  let [resultArray, setResultArray] = useState([]);
  let [selectedAttribute, setSelectedAttribute] = useState("");
  let [selectedValue, setselectedValue] = useState("");
  let [error, setError] = useState(false);
  let [isAuth, setIsAuth] = useState(true);
  let [message, setMessage] = useState("");
  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setselectedValue(value);
  };
  const handleSelect = (e) => {
    setSelectedAttribute(e.target.value);
  };
  const resetData = () => {
    setUserData({
      po: "",
      name: "",
      address: "",
      gender: "",
      groupIncharge: "",
      status: "",
      bloodGroup: "",
    });
  };
  const validateData = () => {
    if (selectedAttribute === "name" && !userData.name) {
      setError(true);
      setMessage("Please enter valid name");
      return false;
    }
    if (selectedAttribute === "address" && !userData.address) {
      setError(true);
      setMessage("Please enter valid address");
      return false;
    }
    if (selectedAttribute === "pno" && !userData.pno) {
      setError(true);
      setMessage("Please enter valid P.NO");
      return false;
    }
    if (selectedAttribute === "gender" && !userData.gender) {
      setError(true);
      setMessage("Please select  gender");
      return false;
    }
    if (selectedAttribute === "groupIncharge" && !userData.groupIncharge) {
      setError(true);
      setMessage("Please enter  groupIncharge name");
      return false;
    }
    if (selectedAttribute === "status" && !userData.status) {
      setError(true);
      setMessage("Please select  status");
      return false;
    }
    if (selectedAttribute === "bloodGroup" && !userData.bloodGroup) {
      setError(true);
      setMessage("Please select  bloodGroup");
      return false;
    }
    return true;
  };
  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    // console.log(userData);
    // console.log("selectedAttribute: ", selectedAttribute);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) return;
    if (!selectedValue) return;
    try {
      setError(false);
      setMessage("");
      let searchData = {
        attribute: selectedAttribute,
        value: selectedValue,
      };
      // console.log(searchData);
      let result = 10;
      // // console.log("result :,", result);
      if (result && result.unauthorized) {
        setError(true);
        setMessage(result.message);
        setResultArray([]);
        setTimeout(() => {
          setIsAuth(false);
        }, 3000);
      }
      if (result && result.success === 0) {
        // console.log(" success 0 Result:", result);
        setError(true);
        setMessage(result.message);
        setResultArray([]);
        return;
      }
      if (result && result.err) {
        setError(true);
        // console.log(" err Result:", result);
        setMessage("server error");
        setResultArray([]);
        return;
      }
      if (result && result.success === 1) {
        // console.log(" success Result 1:", result);
        setResultArray(result.data);
        resetData();
        setError(false);
        setMessage("");
        // console.log("resultArray:", resultArray);
        return;
      }
    } catch (err) {
      // console.log(err);
      setError(true);
      setMessage("Error! please try again");
      setResultArray([]);
    }
  };

  let searchBlock;
  if (selectedAttribute === "name") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="name"
          label="Name"
          value={userData.name}
          helperText="Enter Name only"
          variant="outlined"
          required
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "pno") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="pno"
          label="P. No."
          type="number"
          value={userData.pno}
          helperText="Enter Personal No. "
          variant="outlined"
          required
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "address") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="address"
          label="Enter city name"
          value={userData.address}
          variant="outlined"
          required
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "gender") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            native
            id="gender"
            value={userData.gender}
            onChange={handleInput}
          >
            <option aria-label="None" value="" />
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </Select>
        </FormControl>
      </Grid>
    );
  } else if (selectedAttribute === "groupIncharge") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          id="groupIncharge"
          value={userData.groupIncharge}
          label="group Incharge Name "
          variant="outlined"
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "status") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            native
            id="status"
            value={userData.status}
            onChange={handleInput}
          >
            <option aria-label="None" value="" />

            <option value={"Register"}>Register</option>
            <option value={"Unregister"}>Unregister</option>
            <option value={"BalSewadal"}>BalSewadal</option>
          </Select>
        </FormControl>
      </Grid>
    );
  } else if (selectedAttribute === "bloodGroup") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Blood Group</InputLabel>
          <Select
            native
            id="bloodGroup"
            value={userData.bloodGroup}
            onChange={handleInput}
          >
            <option aria-label="None" value="" />
            <option value={"A+"}>A+</option>
            <option value={"A-"}>A-</option>
            <option value={"B+"}>B+</option>
            <option value={"B-"}>B-</option>
            <option value={"AB+"}>AB+</option>
            <option value={"AB-"}>AB-</option>
            <option value={"O+"}>O+</option>
            <option value={"O-"}>O-</option>
          </Select>
        </FormControl>
      </Grid>
    );
  } else {
    searchBlock = (
      <Alert severity="error">
        "please select any one parameter from above
      </Alert>
    );
  }

  return (
    <MiniDrawer
      props={
        <div className={classes.container}>
          <div className={classes.header}>
            <h2>Search Transactions</h2>

            {isAuth === false ? <Redirect to="/login" /> : <div></div>}
            <FormControl component="fieldset">
              <RadioGroup
                row
                id="selectedAttribute"
                aria-label="position"
                name="position"
                onClick={handleSelect}
              >
                <FormControlLabel
                  id="selectedAttribute"
                  value="name"
                  control={<Radio color="primary" />}
                  label="Name"
                />
                <FormControlLabel
                  id="selectedAttribute"
                  value="gender"
                  control={<Radio color="primary" />}
                  label="Gender"
                />

                <FormControlLabel
                  id="selectedAttribute"
                  value="pno"
                  control={<Radio color="primary" />}
                  label="Personal No"
                />
                <FormControlLabel
                  id="selectedAttribute"
                  value="groupIncharge"
                  control={<Radio color="primary" />}
                  label="Group Incharge Name"
                />
                <FormControlLabel
                  id="selectedAttribute"
                  value="address"
                  control={<Radio color="primary" />}
                  label="City Name"
                />
                <FormControlLabel
                  id="selectedAttribute"
                  value="bloodGroup"
                  control={<Radio color="primary" />}
                  label="Blood Group "
                />
                <FormControlLabel
                  id="selectedAttribute"
                  value="status"
                  control={<Radio color="primary" />}
                  label="Registration Status"
                />
              </RadioGroup>
            </FormControl>
            {error === true ? (
              <Alert severity="error">{message}</Alert>
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
            <h3>Search By:</h3>

            <Grid className={classes.form} container spacing={3}>
              {searchBlock}
            </Grid>
            <br></br>
            <Button
              onClick={submit}
              type="submit"
              color="primary"
              fullWidth
              variant="outlined"
              className={classes.submit}
            >
              Search
              <SearchOutlinedIcon />
            </Button>
          </form>
          <div>
            {!resultArray && resultArray.length < 0 ? (
              <div>No result to display</div>
            ) : (
              resultArray.map((user) => (
                <TransactionMeta key={user.id} user={user}></TransactionMeta>
              ))
            )}
          </div>
        </div>
      }
    ></MiniDrawer>
  );
}
