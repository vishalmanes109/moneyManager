import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import PostAddIcon from "@material-ui/icons/PostAdd";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { addTrasaction } from "../utilities/ApiService";

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

export default function Form({ name, transData }) {
  const classes = useStyles();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  let todayDate = mm + "/" + dd + "/" + yyyy;
  let [transactionData, setTransactionData] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    mode_of_payment: "",
    essential: "",
    category_id: "",
    currency_id: "",
    transaction_type_id: "",
  });
  let [updateTransactionData, setUpdatedTransactionData] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    mode_of_payment: "",
    essential: "",
    category_id: "",
    currency_id: "",
    transaction_type_id: "",
  });
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState("");
  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value .... eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setUpdatedTransactionData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    if (name === "Update") {
      setTransactionData(transData);
    }
  });
  const resetData = () => {
    setTransactionData({
      title: "",
      description: "",
      amount: "",
      date: "",
      mode_of_payment: "",
      essential: "",
      category_id: "",
      currency_id: "",
      transaction_type_id: "",
    });
  };
  const validateData = () => {
    if (!transactionData.title) {
      setError(true);
      setMessage("Please enter valid title: MAX 50 Characters");
      return false;
    }
    if (!transactionData.description) {
      setError(true);
      setMessage("Please enter valid description");
      return false;
    }

    if (!transactionData.amount || transactionData.amount < 1) {
      setError(true);
      setMessage("Please enter valid amount (must be greater than 0)");
      return false;
    }

    if (!transactionData.transaction_type_id) {
      setError(true);
      setMessage("Please select valid transaction Type");
      return false;
    }
    if (!transactionData.date) {
      setError(true);
      setMessage("Please enter valid Date");
      return false;
    }

    if (!transactionData.mode_of_payment) {
      setError(true);
      setMessage("Please enter valid Mode of payment");
      return false;
    }
    if (!transactionData.essential) {
      setError(true);
      setMessage("Please select essential ");
      return false;
    }
    if (!transactionData.category_id) {
      setError(true);
      setMessage("Please select valid category");
      return false;
    }
    if (!transactionData.currency_id) {
      setError(true);
      setMessage("Please select valid Currency");
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    let isValide = true;
    e.preventDefault();
    console.log(transactionData);
    window.scrollTo({ top: 0, behavior: "smooth" });

    isValide = validateData();
    // console.log(isValide);
    if (isValide === false) return;
    try {
      setSuccess(false);
      setError(false);
      setMessage("");
      transactionData.user_id = localStorage.getItem("userid");
      let result = await addTrasaction(transactionData);
      console.log("Transaction Added Succesfully!", result);

      if (result && result.status === 200 && result.data.success === 1) {
        setError(false);
        setSuccess(true);

        setMessage(`Transaction ${name}ed Succesfully!`);
        return;
      }
      if (result && result.status === 400 && result.data.success !== 1) {
        console.log("lol:", result.data);
        resetData();
        setError(true);
        setSuccess(false);
        setMessage("Transaction Failed");
        return;
      }
      if (result && result.status === 500 && result.data.success !== 1) {
        console.log("lol:", result.data);
        resetData();
        setError(true);
        setSuccess(false);
        setMessage("Server Error");
        return;
      }
    } catch (err) {
      setError(true);
      setMessage("Error! please try again");
    }
  };
  return (
    <>
      <div className={classes.header}>
        <h3>{name} Transaction Details</h3>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        {error === true ? (
          <Alert severity="error">{message}</Alert>
        ) : (
          <div></div>
        )}
        {success === true ? (
          <Alert severity="success">{message}</Alert>
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
              id="title"
              label="Title"
              value={transactionData.title}
              helperText="Enter title MAX 50 Characters"
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="description"
              label="Description "
              value={transactionData.description}
              helperText="Enter description of transaction"
              variant="outlined"
              required
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              fullWidth
              id="amount"
              label="Amount"
              value={transactionData.amount}
              helperText="Enter Amount of transaction (only numbers)"
              variant="outlined"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                native
                required
                id="transaction_type_id"
                value={transactionData.transaction_type_id}
                onChange={handleInput}
              >
                <option aria-label="None" value="" />
                <option value={1}>Income</option>
                <option value={2}>Expense</option>
                <option value={3}>Transafer</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="date"
              id="date"
              label="Date"
              variant="outlined"
              value={transactionData.date}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" required fullWidth>
              <InputLabel>Mode Of Payment</InputLabel>
              <Select
                native
                id="mode_of_payment"
                value={transactionData.mode_of_payment}
                onChange={handleInput}
                required
              >
                <option aria-label="None" value="" />
                <option value={"Cash"}>Cash</option>
                <option value={"Debit"}>Debit</option>
                <option value={"Credit"}>Credit</option>
                <option value={"Cheque"}>Cheque</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" required fullWidth>
              <InputLabel>Essential</InputLabel>
              <Select
                native
                id="essential"
                value={transactionData.essential}
                onChange={handleInput}
                required
              >
                <option aria-label="None" value="" />
                <option value={1}>Yes</option>
                <option value={0}>No</option>
                <option value={2}>Maybe</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" required fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                required
                native
                id="category_id"
                value={transactionData.category_id}
                onChange={handleInput}
              >
                <option aria-label="None" value="" />

                <option value={1}>Heath care</option>
                <option value={2}>Education</option>
                <option value={3}>Dine out</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                native
                id="currency_id"
                value={transactionData.currency_id}
                onChange={handleInput}
              >
                <option aria-label="None" value="" />
                <option value={1}>RS</option>
                <option value={2}>USD</option>
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
          Submit
        </Button>
        <br></br>
      </form>
    </>
  );
}
