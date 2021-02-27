import axios from "../../hoc/axios-orders";
import * as actionTypes from "../actions/actionTypes";

export const OrderPlacedSuccess = () => {
  return {
    type: actionTypes.ORDER_PLACED,
  };
};

export const PlacingOrder = () => {
  return {
    type: actionTypes.PLACING_ORDER,
  };
};

export const PlaceOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(PlacingOrder());
    axios
      .post("./orders.json?auth=" + token, orderData)
      .then((res) => {
        dispatch(OrderPlacedSuccess());
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const FetchingOrders = () => {
  return {
    type: actionTypes.FETCHING_ORDER,
  };
};

export const SetOrders = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    orders: orders,
  };
};

export const FetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(FetchingOrders());
    let url =
      "./orders.json?auth=" +
      token +
      '&orderBy="userId"&equalTo="' +
      userId +
      '"';
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        const orders = [];
        for (let item in data) {
          item = data[item];
          const ingridients = item.ingridients;
          const price = item.price;
          orders.push({ ingridients, price });
        }
        dispatch(SetOrders(orders));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
