import { combineReducers } from "redux";  //整合reducer
import loginReducer from "./login";
import titleReducer from "./title";

export default combineReducers({//状态对象
  userInfo:loginReducer,
  title:titleReducer
})