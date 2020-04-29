import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";


ReactDOM.render(<App/>,document.getElementById('root'))

store.subscribe(()=>{ //如果redux中保存的状态发生变化,那么久调用store.subscribe所指定的回调(redux和组件建立联系)
  ReactDOM.render(<App/>,document.getElementById('root')) //
})