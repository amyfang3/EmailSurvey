import axios from "axios";
import { FETCH_USER } from "./types";

// Redux Thunk sees that we return a function and will automatically call it with the dispatch function
// We make a call to the user API and once that finishes, then we dispatch the action
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
