import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    token: token,
  };
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(Logout());
    }, expireTime * 1000);
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9vIloMmx4iQfOmtS7CALHQuwmc_5tAMY";
    if (method === "LogIn") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9vIloMmx4iQfOmtS7CALHQuwmc_5tAMY";
    }
    axios
      .post(url, authData)
      .then((res) => {
        let expirationTime = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        alert(err);
        dispatch(authFail(err));
      });
  };
};

export const checkAuthStatus = () => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    if (!token) dispatch(Logout());
    else {
      let expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime < new Date()) dispatch(Logout());
      else {
        let userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
