import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../Burger/UI/Buttons/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it will taste good</h1>
      <Burger ingridients={props.ingridients}></Burger>
      <Button type="Danger" clicked={props.cancelclicked}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.continueDataEntry}>
        Proceed
      </Button>
    </div>
  );
};

export default CheckoutSummary;
