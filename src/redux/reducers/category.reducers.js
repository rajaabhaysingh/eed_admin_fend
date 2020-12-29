import { categoryConstants } from "../actions/constants";

const initialState = {
  data: [],
  loading: false,
  fetchSuccessful: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CAT_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_SUCCESS:
      state = {
        ...state,
        data: action.payload.data,
        loading: false,
        fetchSuccessful: true,
        error: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_FAILURE:
      state = {
        ...state,
        data: [],
        loading: false,
        fetchSuccessful: false,
        error: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
