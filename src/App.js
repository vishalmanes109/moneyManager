import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MiniDrawer from "./components/Drawer";
import NotFound from "./components/404";
import Dashboard from "./screens/Dashboard";
import Stats from "./screens/Stats";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/drawer" component={MiniDrawer}></Route>
            <Route path="/stats" component={Stats}></Route>
            <Route path="/" exact component={MiniDrawer}></Route>

            <Route component={NotFound}></Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
