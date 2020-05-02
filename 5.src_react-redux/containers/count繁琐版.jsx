/**
 * count的容器组件,容器组件是真正和redux打交道的人,里面可以随意使用redux的api
 * 容器组件传给ui组件:  redux中保存的状态,用于操作状态的方法
 * 备注:通过props传递
 * 容器组件不是我们定义的,是靠方法生成的
 */

import Count from "../components/Count/Count";  //UI组件

import { connect } from "react-redux"; //引入connect方法
import { increment,decrement } from "../redux/actions/count";//引入action

 /**
  * connect()的返回值是一个函数
  * connect()()是一个容器组件
  * 使用: connect(状态,操作状态的方法)(UI组件)
  */

  /**
   * mapStateToProps用来给UI组件传状态,以props传递
   * 1.porps是key-value的形式,所以mapStateToProps返回一个对象
   */
function mapStateToProps(state) {//react-redux调这个方法的时候,自动传入状态state
  return {count:state}
}
function mapDispatchToProps(dispatch) {
  return {
    increment:(value)=>{dispatch(increment(value))},
    decrement:(value)=>{dispatch(decrement(value))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Count)
