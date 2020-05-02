import countReducer from "./count";
import personReducer from "./person";
import { combineReducers } from "redux"; //引入汇总的方法


/**
 * 1.combineReducers是一个函数
 * 2.调用时传入一个对象,这个对象就是redux中的总状态--state
 * 3.返回值是一个总的reducer
 */
export default combineReducers({
  count:countReducer,
  persons:personReducer
})