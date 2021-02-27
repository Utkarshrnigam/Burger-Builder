import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
const BuildControls = (props) => {
  let controls = [];

  for (const item in props.ingridients) {
    controls.push(
      <BuildControl
        key={item}
        type={item}
        incClicked={() => props.incClicked(item)}
        descClicked={() => props.descClicked(item)}
        disabled={props.disabled[item]}
      ></BuildControl>
    );
  }
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls}
      <button
        className={classes.OrderButton}
        disabled={!(props.orderNow && props.isAuth)}
        onClick={props.updateOrdering}
      >
        {props.isAuth ? "ORDER NOW" : "SignIn to Order"}
      </button>
    </div>
  );
};

export default BuildControls;
