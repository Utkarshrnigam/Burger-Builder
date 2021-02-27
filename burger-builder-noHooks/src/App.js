import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import Auxi from "./hoc/Auxi";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/checkout/checkout";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as authActions from "./store/actions/index";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.onAuthStatusCheck();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/Orders" component={Orders}></Route>
          <Route path="/Logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
    return (
      <Auxi>
        <Layout>{routes}</Layout>
      </Auxi>
    );
  }
}
const mapPropsToState = (state) => {
  return {
    isAuth: state.Auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStatusCheck: () => {
      dispatch(authActions.checkAuthStatus());
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(App);
