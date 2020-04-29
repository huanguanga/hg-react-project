import React, { Component } from 'react'

export default class Count extends Component {
  state={
    count:0
  }
  //加
  increment = ()=>{
    let {count} = this.state
    const {value} = this.refs.add_selected
    count += +value
    this.setState({count})
  }
  //加
  decrement = ()=>{
    let {count} = this.state
    const {value} = this.refs.add_selected
    count -= +value
    this.setState({count})
  }
  //加
  incrementIfOdd = ()=>{
    let {count} = this.state
    const {value} = this.refs.add_selected
    if (count % 2 !== 0) {
      count += +value
      this.setState({count})
    }
  }
  //加
  incrementAsync = ()=>{
    let {count} = this.state
    const {value} = this.refs.add_selected
    setTimeout(() => {
      count += +value
    this.setState({count})
    }, 500);
  }
  render() {
    return (
      <div>
        <h1>当前的和为:{this.state.count}</h1>
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
