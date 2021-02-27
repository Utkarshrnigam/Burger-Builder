import * as actionTypes from "./actionTypes";
import axios from "../../hoc/axios-orders";
export const addIngridient = (name) => {
  return {
    type: actionTypes.ADD_ING,
    ingName: name,
  };
};

export const removeIngridient = (name) => {
  return {
    type: actionTypes.REMOVE_ING,
    ingName: name,
  };
};

export const setIgridients = (ings) => {
  return {
    type: actionTypes.SET_INGS,
    ingridients: ings,
  };
};

export const initIngridients = () => {
  return (dispatch) => {
    axios
      .get("./Ingridients.json")
      .then((res) => {
        dispatch(setIgridients(res.data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
