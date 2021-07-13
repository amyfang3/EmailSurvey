import { FETCH_USER } from "../actions/types";

// first time reducer runs, when the website first renders, we will initially return a null state, meaning we have no clue if the user is logged in or not
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // returns either an Object (current user) or false (if payload is empty string)
    default:
      // no change to state
      return state;
  }
}
