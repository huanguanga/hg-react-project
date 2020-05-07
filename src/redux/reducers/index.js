import { combineReducers } from "redux";  //整合reducer
import loginReducer from "./login";
import titleReducer from "./title";
import categoryReducer from "./category";

export default combineReducers({//状态对象
  userInfo:loginReducer,
  title:titleReducer,
  categoryInfo:categoryReducer
})