// Why index.js?
// allows us to import reducers directory (by convention with import statements in any directories with index.js)
import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
});
