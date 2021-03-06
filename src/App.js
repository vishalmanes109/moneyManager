import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MiniDrawer from "./components/Drawer";
import NotFound from "./screens/NotFound";
import Dashboard from "./screens/Dashboard";
import Stats from "./screens/Stats";
import AddTrasaction from "./screens/AddTransaction";
import UpdateTransaction from "./screens/UpdateTransaction";
import TransactionForm from "./components/TransactionForm";
import SearchTransactions from "./screens/SearchTransaction";
import TransactionCard from "./components/TransactionCard";
import Setting from "./screens/setting";
import Profile from "./screens/Profile";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { amber, green, orange, red, teal } from "@material-ui/core/colors";
import { getSetting } from "./utilities/ApiService";

const lightTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
const darkTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
    type: "dark",
  },
});

const sunnyTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: amber,
    type: "light",
  },
});

const electicTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green,
    type: "light",
  },
});
function App() {
  let [appliedTheme, setAppliedTheme] = useState();

  let localThemeString = localStorage.getItem("theme");

  useEffect(() => {
    async function fetchTheme() {
      try {
        let themeResult = await getSetting();
        if (themeResult && themeResult.status !== 200) {
          setAppliedTheme(darkTheme);
          return;
        }
        if (themeResult && themeResult.status === 200) {
          setAppliedTheme(themeResult.result.data);
          return;
        }
        if (themeResult && themeResult.status !== 200) {
          setAppliedTheme(darkTheme);
          return;
        }
      } catch (err) {
        setAppliedTheme(darkTheme);
      }
    }
    if (!localThemeString) {
      fetchTheme();
    } else {
      if (localThemeString === "dark") {
        setAppliedTheme(darkTheme);
      } else if (localThemeString === "light") {
        setAppliedTheme(lightTheme);
      } else if (localThemeString === "elctric") {
        setAppliedTheme(electicTheme);
      } else if (localThemeString === "sunny") {
        setAppliedTheme(sunnyTheme);
      } else {
        setAppliedTheme(darkTheme);
      }
    }
  }, []);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/register" exact component={Register}></Route>
              <Route
                path="/transcard"
                exact
                component={TransactionCard}
              ></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/drawer" component={MiniDrawer}></Route>
              <Route path="/stats" component={Stats}></Route>
              <Route path="/search" component={SearchTransactions}></Route>
              <Route path="/add_transaction" component={AddTrasaction}></Route>
              <Route path="/setting" component={Setting}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route
                path="/update_transaction"
                component={UpdateTransaction}
              ></Route>
              <Route path="/" exact component={Dashboard}></Route>
              <Route path="/form" component={TransactionForm}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </header>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
