import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxi from "../../../../hoc/Auxi";

const Modal = (props) => {
  let modalClasses = [classes.Modal];

  if (!props.show) modalClasses.push(classes.hidden);

  return (
    <Auxi>
      <Backdrop
        show={props.show}
        updateOrdering={props.updateOrdering}
      ></Backdrop>
      <div className={modalClasses.join(" ")}>{props.children}</div>
    </Auxi>
  );
};

export default Modal;
