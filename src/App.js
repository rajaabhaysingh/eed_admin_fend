import React from "react";

import "./App.css";
import "./styles/styles.css";
import "./styles/margins.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Error from "./components/layouts/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/error" component={Error} />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
