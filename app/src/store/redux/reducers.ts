import { combineReducers } from "redux";
import uiReducer from "./ui/uiReducer";

export default combineReducers({
  ui: uiReducer,
});
