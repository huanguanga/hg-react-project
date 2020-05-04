import { combineReducers } from "redux";  //整合reducer
import loginReducer from "./login";

export default combineReducers({//状态对象
  userInfo:loginReducer,
})