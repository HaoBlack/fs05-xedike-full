import React, { Component } from "react";
import "./App.css";
import Menu from "./Component/Navbar";
import UserList from "../src/Component/Users/UserList";
import Register from "../src/Component/Auth/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../src/Component/Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu></Menu>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/list-user" component={UserList}></Route>
          <Route exact path="/register" component={Register}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
