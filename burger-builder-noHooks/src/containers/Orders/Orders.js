import React, { Component } from "react";

import Order from "../../components/Order/Order";
import * as ordersReducer from "../../store/actions/index";
import classes from "./Orders.module.css";
import { connect } from "react-redux";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    const orderList = [];

    for (let item in this.props.orders) {
      orderList.push(
        <Order
          key={item}
          ingridients={this.props.orders[item].ingridients}
          price={this.props.orders[item].price}
        ></Order>
      );
    }

    let orders = <Spinner></Spinner>;

    if (!this.props.ordersLoading) {
      orders = <div className={classes.Orders}>{orderList}</div>;
    }
    return orders;
  }
}

const mapPropsToState = (state) => {
  return {
    orders: state.Order.orders,
    ordersLoading: state.Order.ordersLoading,
    token: state.Auth.token,
    userId: state.Auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => {
      dispatch(ordersReducer.FetchOrders(token, userId));
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Orders);
