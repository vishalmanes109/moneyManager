import React, { useState } from "react";
import MiniDrawer from "../components/Drawer";
import Notfound from "../components/404";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "@material-ui/icons";
export default function NotFound() {
  let linkComponent = <>Hi</>;

  let [value, setValue] = useState("");
  let handleInput = (e) => {
    setValue(e.target.value);
  };
  let search = () => {
    console.log(value);
    if (value === "login") {
      console.log(value);

      linkComponent = <h1>lol</h1>;
      console.log(linkComponent);
      return;
    }
    if (value === "register") {
      linkComponent = (
        <>
          <Link to="register"></Link>
        </>
      );
      return;
    }
    if (value === "dashboard") {
      linkComponent = (
        <>
          <Link to="dashboard"></Link>
        </>
      );
      return;
    }
  };
  let notfound = (
    <>
      <Notfound></Notfound>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="outlined" required fullWidth>
          <InputLabel>What are you looking for</InputLabel>
          <Select
            native
            id="mode_of_payment"
            value={value}
            onChange={handleInput}
            required
          >
            <option aria-label="None" />
            <option value={"login"}>Login</option>
            <option value={"regsiter"}>Regsiter</option>
            <option value={"dashboard"}>Dashboard</option>
            <option value={"add"}>Add transaction</option>
            <option value={"search"}>Search transaction</option>
            <option value={"setting"}>setting</option>
            <option value={"profile"}>Profile</option>
          </Select>
        </FormControl>

        <Button onClick={search} variant="outlined" color="primary">
          Search
        </Button>
      </form>
      <div>{linkComponent}</div>
    </>
  );
  return (
    <>
      <MiniDrawer props={notfound}></MiniDrawer>
    </>
  );
}
