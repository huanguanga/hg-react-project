import React, { Component } from 'react'
import store from "../../redux/store";
import { increment,decrement } from "../../redux/actions/count";

export default class Count extends Component {
  
  //加
  increment = ()=>{
    const {value} = this.refs.add_selected
    store.dispatch(increment(+value))
  }
  //减
  decrement = ()=>{
    const {value} = this.refs.add_selected
    store.dispatch(decrement(+value))
  }
  //奇数加
  incrementIfOdd = ()=>{
    const {value} = this.refs.add_selected
    const count = store.getState()
    if (count % 2 !== 0) {
      store.dispatch(increment(+value))
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.refs.add_selected
    setTimeout(() => {
      store.dispatch(increment(+value))
    }, 500);
  }
  render() {
    return (
      <div>
        <h1>当前的和为:{store.getState()}</h1>
        <select ref="add_selected">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>&nbsp;
      </div>
    )
  }
}
