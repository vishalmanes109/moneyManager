import React, { useEffect, useRef, useState } from "react";
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
    background: "#008000",
    color: "white",
  },
}));
export default function Form({ name }) {
  const classes = useStyles();
  let currency = "";

  let [data, setData] = useState({
    title: "",
    description: "",
    amount: 0,
    transaction_type: "",
    category: "",
    currency: "",
  });

  let currencyData = [
    { value: 1, name: "RS" },
    { value: 2, name: "YEN" },
    { value: 3, name: "USD" },
  ];
  let categoryData = [
    { value: 1, name: "Shopping" },
    { value: 2, name: "Heath care" },
    { value: 3, name: "dine out" },
  ];
  let [transactionType, setTransactionType] = useState("");
  let [error, setError] = useState(false);
  let [message, setMessage] = useState("");
  useEffect(() => {
    if (name === "Update") {
      // fetch the data and store it into data using setData()
    }
    currency = localStorage.getItem("currency");
    setData((prevState) => ({
      ...prevState,
      currency: currency,
    }));
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    // ...prevState means it takes prev object and spreads it value (using ....)
    //  eg. initial time prevSate object id {name: "",email:"",password:"" }
    // so it got spread as name="", email="", password="" single variable and not an array

    // [id]:value => this takes value from e.target.value and put it into e.target.id for every entity in prevState object
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const resetError = () => {
    setError(false);
    setMessage("");
  };

  let submit = (e) => {
    e.preventDefault();

    if (
      (!data.title || !data.description,
      !data.transaction_type || !data.category)
    ) {
      setError(true);
      setMessage("Please Fill Required details");
    } else if (data.title.length > 50) {
      setError(true);
      setMessage("Title must be less 50 character");
    } else if (data.description.length > 200) {
      setError(true);
      setMessage("Description must be less 200 character");
    } else if (data.amount < 1) {
      setError(true);
      setMessage("Amount must be greater than 0");
    }

    console.log(data);
    console.log(error);
    console.log(message);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {name} Transaction
        </Typography>
        {error === true ? (
          <Alert severity="error">{message}</Alert>
        ) : (
          <div></div>
        )}

        <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            value={data.title}
            autoFocus
            onChange={handleInput}
            onFocus={resetError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={data.description}
            onChange={handleInput}
            onFocus={resetError}
          />
          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            autoComplete="amount"
            value={data.amount}
            onChange={handleInput}
            onFocus={resetError}
          />
          <br />
          <br />
          <FormControl variant="outlined" required fullWidth>
            <InputLabel>Transaction Type</InputLabel>
            <Select
              native
              id="transaction_type"
              variant="outlined"
              margin="normal"
              value={data.transaction_type}
              onChange={handleInput}
              label="Transaction Type"
              onFocus={resetError}
            >
              <option aria-label="None" value="" />
              <option value={"income"}>Income</option>
              <option value={"expense"}>Expense</option>
              <option value={"transfer"}>Transfer</option>
            </Select>
          </FormControl>
          <br />
          <br />

          {/* {data.transaction_type === "income" ? (
            <div></div>
          ) : (
            <div></div>
          )} */}

          <FormControl variant="outlined" required fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              native
              variant="outlined"
              margin="normal"
              id="category"
              value={data.category}
              onChange={handleInput}
              label="Category"
              onFocus={resetError}
            >
              <option aria-label="None" value="" />
              {categoryData.map((category) => {
                return (
                  <>
                    <option value={category.value}>{category.name}</option>
                  </>
                );
              })}
            </Select>
          </FormControl>

          <br />
          <br />

          <FormControl variant="outlined" required fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              native
              variant="outlined"
              margin="normal"
              id="currency"
              value={data.currency}
              onChange={handleInput}
              label="Currency"
              onFocus={resetError}
            >
              <option value={data.currency}>{data.currency}</option>

              {currencyData.map((currency) => {
                return (
                  <>
                    <option value={currency.name}>{currency.name}</option>
                  </>
                );
              })}
            </Select>
          </FormControl>
          <br></br>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {name}
          </Button>
        </form>
      </div>
    </Container>
  );
}
