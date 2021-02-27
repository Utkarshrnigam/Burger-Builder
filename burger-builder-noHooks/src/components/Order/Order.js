import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
  const ingridientsList = [];
  for (let item in props.ingridients) {
    ingridientsList.push(
      <p
        key={item}
        className={[classes.ingridients, classes.ingridientsList].join(" ")}
      >
        {item}({props.ingridients[item]})
      </p>
    );
  }

  return (
    <div className={classes.Order}>
      <p className={classes.ingridients}>
        <strong>Ingridients: </strong>
      </p>
      {ingridientsList}
      <p>
        <strong>Price: </strong>
        {props.price} Rs.
      </p>
    </div>
  );
};

export default Order;
