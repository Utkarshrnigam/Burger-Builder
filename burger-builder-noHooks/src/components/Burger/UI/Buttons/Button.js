import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  let btnClasses = [classes[props.type], classes.Button];

  btnClasses.push(classes[props.classList]);
  if (props.disable) {
    btnClasses.push(classes.disabled);
  }
  // console.log(btnClasses);
  return (
    <button
      onClick={props.clicked}
      disabled={props.disable}
      className={btnClasses.join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
