//高阶组件   用于检查传递过来的组件是否可以被看到
 /**
  * 规则:  
  *     1.没有登录,则只能看到Login组件(非Login不允许看)
  *     2.如果登录了:则不能看Login组件(Login不允许看)
  */
//高阶组件接收到的是组件,返回的也是组件

import React,{ Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function demo (ReciveComponent) {  //高阶组件的本质是一个函数
  @connect(
    (state)=>({isLogin:state.userInfo.isLogin}),
    {}
  )
  class TargetComponent extends Component{
    render(){
      const {pathname} = this.props.location
      if (!this.props.isLogin&&pathname !== '/login') return <Redirect to="/login"/>
      if (this.props.isLogin&&pathname === '/login') return <Redirect to="/admin"/>
      return <ReciveComponent {...this.props}/>
    }
  }

  return TargetComponent
}