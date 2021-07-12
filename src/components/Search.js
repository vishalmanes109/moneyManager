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
import { getTransactionByAttribute } from "../utilities/ApiService";

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

  let [searchData, setsearchData] = useState({
    title: "",
    description: "",
    category_id: "",
    essential: "",
    transaction_type: "",
    period: "",
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
    setsearchData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setselectedValue(value);
  };
  const handleSelect = (e) => {
    setSelectedAttribute(e.target.value);
  };
  const resetData = () => {
    setsearchData({
      title: "",
      description: "",
      category_id: "",
      essential: "",
      transaction_type: "",
      period: "",
    });
  };
  const validateData = () => {
    if (selectedAttribute === "name" && !searchData.name) {
      setError(true);
      setMessage("Please enter valid name");
      return false;
    }
    if (selectedAttribute === "address" && !searchData.address) {
      setError(true);
      setMessage("Please enter valid address");
      return false;
    }
    if (selectedAttribute === "pno" && !searchData.pno) {
      setError(true);
      setMessage("Please enter valid P.NO");
      return false;
    }
    if (selectedAttribute === "gender" && !searchData.gender) {
      setError(true);
      setMessage("Please select  gender");
      return false;
    }
    if (selectedAttribute === "groupIncharge" && !searchData.groupIncharge) {
      setError(true);
      setMessage("Please enter  groupIncharge name");
      return false;
    }
    if (selectedAttribute === "status" && !searchData.status) {
      setError(true);
      setMessage("Please select  status");
      return false;
    }
    if (selectedAttribute === "bloodGroup" && !searchData.bloodGroup) {
      setError(true);
      setMessage("Please select  bloodGroup");
      return false;
    }
    return true;
  };
  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    // console.log(searchData);
    // console.log("selectedAttribute: ", selectedAttribute);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) {
      console.log("invalide");
      return;
    }
    if (!selectedValue && selectedAttribute) {
      setError(true);
      setMessage("Please enter/select value to search");
      return;
    }
    try {
      setError(false);
      setMessage("");
      // console.log(searchData);
      // let result = 10;
      let result = await getTransactionByAttribute(
        selectedAttribute,
        selectedValue
      );
      console.log("result :,", result.data.result);
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
      if (result && result.status === 200 && result.data.success === 1) {
        // console.log(" success Result 1:", result);
        setResultArray(result.data.result);
        resetData();
        setError(false);
        setMessage("");
        // console.log("resultArray:", resultArray);
        return;
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setMessage("Server Error! Please try again");
      setResultArray([]);
    }
  };

  let searchBlock;
  if (selectedAttribute === "title") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          value={searchData.title}
          helperText="Enter Title"
          variant="outlined"
          required
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "description") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="description"
          label="Description"
          value={searchData.description}
          helperText="Enter description you remember "
          variant="outlined"
          required
          onChange={handleInput}
        />
      </Grid>
    );
  } else if (selectedAttribute === "period") {
    searchBlock = (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="startDate"
            label="Slect start Date "
            type="date"
            value={searchData.startDate}
            variant="outlined"
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="endDate"
            label="select end Date "
            type="date"
            value={searchData.endDate}
            variant="outlined"
            required
            onChange={handleInput}
          />
        </Grid>
      </>
    );
  } else if (selectedAttribute === "transaction_type_id") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            native
            id="transaction_type_id"
            value={searchData.transaction_type_id}
            onChange={handleInput}
          >
            <option aria-label="None" value="" />
            <option value={1}>Income</option>
            <option value={2}>Expense</option>
            <option value={3}>Transfer</option>
          </Select>
        </FormControl>
      </Grid>
    );
  } else if (selectedAttribute === "essential") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Essential</InputLabel>
          <Select
            native
            id="essential"
            value={searchData.essential}
            onChange={handleInput}
          >
            <option aria-label="None" value="" />
            <option value={"yes"}>Yes</option>
            <option value={"no"}>No</option>
            <option value={"maybe"}>Maybe</option>
          </Select>
        </FormControl>
      </Grid>
    );
  } else if (selectedAttribute === "category_id") {
    searchBlock = (
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            native
            id="category_id"
            value={searchData.category_id}
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

  let SearchFormComponent = (
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
              value="title"
              control={<Radio color="primary" />}
              label="Title"
            />
            <FormControlLabel
              id="selectedAttribute"
              value="description"
              control={<Radio color="primary" />}
              label="Description"
            />

            <FormControlLabel
              id="selectedAttribute"
              value="transaction_type_id"
              control={<Radio color="primary" />}
              label="Transaction type"
            />
            <FormControlLabel
              id="selectedAttribute"
              value="period"
              control={<Radio color="primary" />}
              label="Time Period"
            />
            <FormControlLabel
              id="selectedAttribute"
              value="essential"
              control={<Radio color="primary" />}
              label="Essential"
            />
            <FormControlLabel
              id="selectedAttribute"
              value="category_id"
              control={<Radio color="primary" />}
              label="Category "
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
        onSubmit={submit}
        className={classes.root}
        noValidate
        autoComplete="off"
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
          resultArray.map((transactionData) => (
            <TransactionMeta
              key={transactionData.id}
              transactionData={transactionData}
            ></TransactionMeta>
          ))
        )}
      </div>
    </div>
  );
  return <MiniDrawer props={SearchFormComponent}></MiniDrawer>;
}
