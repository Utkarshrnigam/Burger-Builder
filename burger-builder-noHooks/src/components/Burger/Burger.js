import React from "react";
import classes from "./Burger.module.css";
import BurgerIngridients from "./BurgerIngridients/BurgerIngridients";
const Burger = (props) => {
  let layers = [];
  for (const item in props.ingridients) {
    for (let i = 0; i < props.ingridients[item]; i++) {
      layers.push(
        <BurgerIngridients key={item + i} type={item}></BurgerIngridients>
      );
    }
  }
  if (layers.length === 0)
    layers.push(
      <p key={0} className={classes.noIngridients}>
        Try Adding Some Stuff
      </p>
    );
  return (
    <div className={classes.Burger}>
      <BurgerIngridients type="bread-top"></BurgerIngridients>
      {layers}
      <BurgerIngridients type="bread-bottom"></BurgerIngridients>
    </div>
  );
};

export default Burger;
