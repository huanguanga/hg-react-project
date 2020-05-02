import { createStore,applyMiddleware } from 'redux'//引入applyMiddleware,用来配合thunk
import allReducer from "./reducers";
import thunk from "redux-thunk";//支持异步action
import { composeWithDevTools } from "redux-devtools-extension";//开发者工具需要的库,composeWithDevTools的返回值要作为createStore的第二个参数,如果第二个参数被占用,就将原本占位的参数作为composeWithDevTools的参数

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))//加第二个参数applyMiddleware,且这个参数是函数调用的返回值
