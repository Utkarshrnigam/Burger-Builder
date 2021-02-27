import * as actionTypes from "../actions/actionTypes";

const ING_PRICE = {
  meat: 30,
  salad: 10,
  cheese: 20,
  bacon: 35,
};

const initState = {
  ingridients: null,
  price: 10,
  building: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingName]: state.ingridients[action.ingName] + 1,
        },
        price: state.price + ING_PRICE[action.ingName],
        building: true,
      };

    case actionTypes.REMOVE_ING:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingName]: state.ingridients[action.ingName] - 1,
        },
        price: state.price - ING_PRICE[action.ingName],
        building: true,
      };

    case actionTypes.SET_INGS:
      return {
        ...state,
        ingridients: action.ingridients,
        price: 10,
        building: false,
      };

    default:
      return state;
  }
};

export default reducer;
