import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import signupReducers from "./signup.reducers";
import categoryReducers from "./category.reducers";
import courseReducers from "./course.reducers";
import ordersReducers from "./orders.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducers,
  category: categoryReducers,
  course: courseReducers,
  order: ordersReducers,
});

export default rootReducer;
