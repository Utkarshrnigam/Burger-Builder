import React from "react";
import classes from "./BuildControl.module.css";
const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.type.toUpperCase()}</div>
      <button
        className={classes.Less}
        disabled={props.disabled}
        onClick={props.descClicked}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.incClicked}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
