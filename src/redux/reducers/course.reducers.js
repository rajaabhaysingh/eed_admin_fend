import {
  courseConstants,
  addModuleConstants,
  addContentConstants,
} from "../actions/constants";

const initialState = {
  postCourseData: null,
  postCourseLoading: false,
  postCourseSuccessful: false,
  postCourseError: null,
  getAllCourseData: [],
  getAllCourseLoading: false,
  getAllCourseSuccessful: false,
  getAllCourseError: null,
  getCourseByIdData: null,
  getCourseByIdLoading: false,
  getCourseByIdSuccessful: false,
  getCourseByIdError: null,
  addModuleData: null,
  addModuleLoading: false,
  addModuleSuccessful: false,
  addModuleError: null,
  addContentData: null,
  addContentLoading: false,
  addContentSuccessful: false,
  addContentError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case courseConstants.ADD_COURSE_REQUEST:
      state = {
        ...state,
        postCourseLoading: true,
        postCourseError: null,
      };
      break;

    case courseConstants.ADD_COURSE_SUCCESS:
      state = {
        ...state,
        postCourseData: action.payload.data,
        postCourseLoading: false,
        postCourseSuccessful: true,
        postCourseError: null,
      };
      break;

    case courseConstants.ADD_COURSE_FAILURE:
      state = {
        ...state,
        postCourseData: null,
        postCourseLoading: false,
        postCourseSuccessful: false,
        postCourseError: action.payload.error,
      };
      break;

    case courseConstants.GET_ALL_COURSE_REQUEST:
      state = {
        ...state,
        getAllCourseLoading: true,
        getAllCourseError: null,
      };
      break;

    case courseConstants.GET_ALL_COURSE_SUCCESS:
      state = {
        ...state,
        getAllCourseData: action.payload.data,
        getAllCourseLoading: false,
        getAllCourseSuccessful: true,
        getAllCourseError: null,
      };
      break;

    case courseConstants.GET_ALL_COURSE_FAILURE:
      state = {
        ...state,
        getAllCourseData: null,
        getAllCourseLoading: false,
        getAllCourseSuccessful: false,
        getAllCourseError: action.payload.error,
      };
      break;

    case courseConstants.GET_COURSE_BY_ID_REQUEST:
      state = {
        ...state,
        getCourseByIdLoading: true,
        getCourseByIdError: null,
      };
      break;

    case courseConstants.GET_COURSE_BY_ID_SUCCESS:
      state = {
        ...state,
        getCourseByIdData: action.payload.data,
        getCourseByIdLoading: false,
        getCourseByIdSuccessful: true,
        getCourseByIdError: null,
      };
      break;

    case courseConstants.GET_COURSE_BY_ID_FAILURE:
      state = {
        ...state,
        getCourseByIdData: null,
        getCourseByIdLoading: false,
        getCourseByIdSuccessful: false,
        getCourseByIdError: action.payload.error,
      };
      break;

    case addModuleConstants.ADD_MODULE_REQUEST:
      state = {
        ...state,
        addModuleLoading: true,
        addModuleError: null,
      };
      break;

    case addModuleConstants.ADD_MODULE_SUCCESS:
      state = {
        ...state,
        addModuleData: action.payload.data,
        getCourseByIdData: action.payload.data,
        addModuleLoading: false,
        addModuleSuccessful: true,
        addModuleError: null,
      };
      break;

    case addModuleConstants.ADD_MODULE_FAILURE:
      state = {
        ...state,
        addModuleData: null,
        addModuleLoading: false,
        addModuleSuccessful: false,
        addModuleError: action.payload.error,
      };
      break;

    case addContentConstants.ADD_CONTENT_REQUEST:
      state = {
        ...state,
        addContentLoading: true,
        addContentError: null,
      };
      break;

    case addContentConstants.ADD_CONTENT_SUCCESS:
      state = {
        ...state,
        addContentData: action.payload.data,
        getCourseByIdData: action.payload.data,
        addContentLoading: false,
        addContentSuccessful: true,
        addContentError: null,
      };
      break;

    case addContentConstants.ADD_CONTENT_FAILURE:
      state = {
        ...state,
        addContentData: null,
        addContentLoading: false,
        addContentSuccessful: false,
        addContentError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
