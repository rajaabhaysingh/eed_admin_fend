import { authConstants } from "../actions/constants";

const initialState = {
  token: null,
  user: {},
  authenticated: false,
  authenticating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.data,
        token: action.payload.token,
        authenticating: false,
        authenticated: true,
      };
      break;

    default:
      break;
  }

  return state;
};
