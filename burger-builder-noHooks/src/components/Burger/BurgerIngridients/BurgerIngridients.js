import React from "react";
import classes from "./BurgerIngridients.module.css";

const BurgerIngridients = (props) => {
  let ingridient = null;

  if (props.type === "meat") ingridient = <div className={classes.Meat}></div>;
  else if (props.type === "bacon")
    ingridient = <div className={classes.Bacon}></div>;
  else if (props.type === "cheese")
    ingridient = <div className={classes.Cheese}></div>;
  else if (props.type === "salad")
    ingridient = <div className={classes.Salad}></div>;
  else if (props.type === "bread-bottom")
    ingridient = <div className={classes.BreadBottom}></div>;
  else if (props.type === "bread-top")
    ingridient = <div className={classes.BreadTop}></div>;

  return ingridient;
};

export default BurgerIngridients;
