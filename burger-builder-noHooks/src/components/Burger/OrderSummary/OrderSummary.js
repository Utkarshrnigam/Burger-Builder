import React from "react";
import Auxi from "../../../hoc/Auxi";
import classes from "./OrderSummary.module.css";
import Button from "../UI/Buttons/Button";
const OrderSummary = (props) => {
  let orderSummaryList = [];

  orderSummaryList.push(
    <li className={[classes.list, classes.marginBottom].join(" ")} key="head">
      <span>Items</span> <span> Quantity</span> <span></span> <span>Price</span>
      <span>Amount</span>
    </li>
  );
  orderSummaryList.push(
    <li className={classes.list} key="default">
      <span>Bread</span> <span> 2</span> <span>x</span> <span>5</span>
      <span>10</span>
    </li>
  );
  for (let item in props.ingridients) {
    orderSummaryList.push(
      <li className={classes.list} key={item}>
        <span>{item.toUpperCase()} </span>
        <span>{props.ingridients[item]}</span> <span>x</span>
        <span>{props.costs[item]}</span>
        <span>{props.ingridients[item] * props.costs[item]}</span>
      </li>
    );
  }

  return (
    <Auxi>
      <h3>Order Summary</h3>
      <p>Your Burger have the following items...</p>
      <ul>{orderSummaryList}</ul>
      <p className={classes.totalAmount}>
        <strong>Total Amount = {props.totalAmount}</strong>
      </p>
      <p>Press Proceed to place Order</p>
      <Button clicked={props.cancel} type="Danger">
        Cancel
      </Button>
      <Button clicked={props.proceed} type="Success">
        Proceed
      </Button>
    </Auxi>
  );
};
export default OrderSummary;
