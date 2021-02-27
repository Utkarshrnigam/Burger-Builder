import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter } from "react-router-dom";
import ContactData from "../checkout/ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  cancelProceed = () => {
    this.props.history.goBack();
  };
  continueDataEntry = () => {
    this.props.history.replace("/checkout/data-entry");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.props.ings}
          cancelclicked={this.cancelProceed}
          continueDataEntry={this.continueDataEntry}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/data-entry"}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.BurgerBuilder.ingridients,
    price: state.BurgerBuilder.price,
  };
};

export default connect(mapStateToProps)(Checkout);
