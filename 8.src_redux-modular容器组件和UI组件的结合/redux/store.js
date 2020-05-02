import { createStore,applyMiddleware } from 'redux'//引入applyMiddleware,用来配合thunk
import allReducer from "./reducers";
import thunk from "redux-thunk";//支持异步action

export default createStore(allReducer,applyMiddleware(thunk))//加第二个参数applyMiddleware,且这个参数是函数调用的返回值
