import axiosIntance from "../../helpers/axios";
import { authConstants } from "./constants";

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
          console.log(res);
          if (res.status === 400) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({
              type: authConstants.LOGIN_FAILURE,
              payload: {
                message: res,
              },
            });
          }
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            message: err.message,
          },
        });
      });
  };
};

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
        payload: { message: "Failed to login." },
      });
    }
  };
};
