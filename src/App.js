import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MiniDrawer from "./components/Drawer";
import NotFound from "./components/404";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/dashboard" exact component={MiniDrawer}></Route>
            <Route path="/404" exact component={NotFound}></Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
