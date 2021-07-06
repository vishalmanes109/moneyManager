import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MiniDrawer from "./components/Drawer";
// import NotFound from "./components/404";
import NotFound from "./screens/NotFound";
import Dashboard from "./screens/Dashboard";
import Stats from "./screens/Stats";
import AddTrasaction from "./screens/AddTransaction";
import UpdateTransaction from "./screens/UpdateTransaction";
import TransactionForm from "./components/TransactionForm";
import SearchTransactions from "./screens/SearchTransaction";
import TransactionCard from "./components/TransactionCard";
import Setting from "./screens/setting";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/transcard" exact component={TransactionCard}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/drawer" component={MiniDrawer}></Route>
            <Route path="/stats" component={Stats}></Route>
            <Route path="/search" component={SearchTransactions}></Route>
            <Route path="/add_transaction" component={AddTrasaction}></Route>
            <Route path="/setting" component={Setting}></Route>
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
  );
}

export default App;
