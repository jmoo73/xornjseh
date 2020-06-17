import React, { Component } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Home from "./containers/Home/Home";
import AuthHome from "./containers/Home/AuthHome";
import Auth from "./containers/Auth/Auth";
import Dailylog from "./containers/DailyLog/Dailylog";
import Weeklylog from "./containers/Weeklylog/Weeklylog";
import Personallog from "./components/layout/Personallog";
import Updatemember from "./containers/Updatemember/Updatemember";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/authHome" component={AuthHome} />
          <Route exact path="/dailylog" component={() => <Dailylog />} />
          <Route exact path="/weeklylog" component={Weeklylog} />
          <Route exact path="/personallog" component={Personallog} />
          <Route exact path="/updatemember" component={Updatemember} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/authHome" />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <Layout>{routes}</Layout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default withRouter(connect(mapStateToProps)(App));
