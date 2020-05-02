//count的ui组件
import React, { Component } from 'react'

export default class Count extends Component {
  
  //加
  increment = ()=>{
    const {value} = this.refs.add_selected
    this.props.increment(+value)
  }
  //减
  decrement = ()=>{
    const {value} = this.refs.add_selected
    this.props.decrement(+value)
  }
  //奇数加
  incrementIfOdd = ()=>{
    const {value} = this.refs.add_selected
    if (this.props.count %2 ===1) {
      this.props.increment(+value)
    }
  }
  //异步加
  incrementAsync = ()=>{
    const {value} = this.refs.add_selected
    this.props.incrementAsync(+value,500)
  }
  render() {
    return (
      <div>
        <h1>当前的和为:{this.props.count}</h1>
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
