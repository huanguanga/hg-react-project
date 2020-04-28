import React, { Component } from 'react'
import { Switch,Route,Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Redirect to="/login"/>
      </Switch>
    )
  }
}
