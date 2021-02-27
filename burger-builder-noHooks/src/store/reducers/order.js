import * as actionTypes from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
  ordersLoading: true,
};

export const reducer = (state = initState, actions) => {
  switch (actions.type) {
    case actionTypes.PLACING_ORDER:
      return {
        ...state,
        loading: true,
        purchased: false,
      };

    case actionTypes.ORDER_PLACED:
      return {
        ...state,
        loading: false,
        purchased: true,
      };

    case actionTypes.FETCHING_ORDER:
      return {
        ...state,
        ordersLoading: true,
      };

    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: actions.orders,
        ordersLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
