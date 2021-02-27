import * as actionTypes from "../actions/actionTypes";

const initState = {
  userId: null,
  token: null,
  error: null,
  loading: false,
};

const reducer = (state = initState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: actions.userId,
        token: actions.token,
        loading: false,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: actions.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
