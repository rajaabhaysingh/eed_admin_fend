import axiosIntance from "../../helpers/axios";
import { authConstants } from "./constants";

// login
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    await axiosIntance
      .post("/api/admin/login", {
        ...user,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { token, data } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              data,
            },
          });
        } else {
          localStorage.clear();
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              error: "Unexpected error occured. [code: arreacau]",
            },
          });
        }
      })
      .catch((err) => {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: err.response.data.error,
          },
        });
      });
  };
};

// isUserLoggedIn
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Login failed. [code: arreacau]" },
      });
    }
  };
};

// logout
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    await axiosIntance
      .post("/api/admin/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
          dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: "Unexpected error occured. [code: arreacau]" },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: { error: err.message },
        });
      });
  };
};
