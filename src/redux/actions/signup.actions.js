import axiosIntance from "../../helpers/axios";
import { signupConstants } from "./constants";

// signup
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: signupConstants.SIGNUP_REQUEST,
    });

    await axiosIntance
      .post("/api/admin/signup", {
        ...user,
      })
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          dispatch({
            type: signupConstants.SIGNUP_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: signupConstants.SIGNUP_FAILURE,
              payload: {
                error: "Unexpected error occured. [code: arreacau]",
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: signupConstants.SIGNUP_FAILURE,
          payload: {
            error: err.response.data.error,
          },
        });
      });
  };
};
