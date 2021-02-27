import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import NavBar from "./Navigation/Navbar/NavBar";
import { connect } from "react-redux";
// import SideBar from "./Navigation/SideBar/SideBar";
class Layout extends Component {
  render() {
    return (
      <Auxi>
        <NavBar isAuth={this.props.isAuth}></NavBar>
        {/* <SideBar></SideBar> */}
        <main>{this.props.children}</main>
      </Auxi>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    isAuth: state.Auth.token !== null,
  };
};

export default connect(mapPropsToState)(Layout);
