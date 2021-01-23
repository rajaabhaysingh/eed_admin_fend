import { Error } from "@material-ui/icons";
import axiosIntance from "../../helpers/axios";
import {
  addContentConstants,
  addModuleConstants,
  courseConstants,
} from "./constants";

// addCourse
export const addCourse = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: courseConstants.ADD_COURSE_REQUEST,
    });

    await axiosIntance
      .post("/api/course/create", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          dispatch({
            type: courseConstants.ADD_COURSE_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: courseConstants.ADD_COURSE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: courseConstants.ADD_COURSE_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// getAllCourse
export const getAllCourse = () => {
  return async (dispatch) => {
    dispatch({
      type: courseConstants.GET_ALL_COURSE_REQUEST,
    });

    await axiosIntance
      .get("/api/course/get")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: courseConstants.GET_ALL_COURSE_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: courseConstants.GET_ALL_COURSE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: courseConstants.GET_ALL_COURSE_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// getCourseById
export const getCourseById = (courseId) => {
  return async (dispatch) => {
    dispatch({
      type: courseConstants.GET_COURSE_BY_ID_REQUEST,
    });

    await axiosIntance
      .get(`/api/course/get-course-by-id/${courseId}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: courseConstants.GET_COURSE_BY_ID_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: courseConstants.GET_COURSE_BY_ID_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: courseConstants.GET_COURSE_BY_ID_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// addModuleAction
export const addModuleAction = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: addModuleConstants.ADD_MODULE_REQUEST,
    });

    await axiosIntance
      .post("/api/course/create/add-new-module", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          dispatch({
            type: addModuleConstants.ADD_MODULE_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: addModuleConstants.ADD_MODULE_FAILURE,
              payload: {
                error: "Unexpected error occured. [code: arreacad]",
              },
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: addModuleConstants.ADD_MODULE_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// addContentAction
export const addContentAction = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: addContentConstants.ADD_CONTENT_REQUEST,
    });

    await axiosIntance
      .post("/api/course/create/module/add-new-content", formData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          dispatch({
            type: addContentConstants.ADD_CONTENT_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          if (res.status === 400) {
            dispatch({
              type: addContentConstants.ADD_CONTENT_FAILURE,
              payload: {
                error: "Unexpected error occured. [code: arreacad]",
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: addContentConstants.ADD_CONTENT_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};
