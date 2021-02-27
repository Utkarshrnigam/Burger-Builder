import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  if (props.show) {
    // return <div>hello</div>;
    return (
      <div onClick={props.updateOrdering} className={classes.Backdrop}></div>
    );
  } else return null;
};

export default Backdrop;
