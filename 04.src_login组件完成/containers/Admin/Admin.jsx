import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteUserInfo } from "@/redux/actions/login"; //退出登录的action

class Admin extends Component {
  logout = ()=>{
    this.props.deleteUserInfo()
  }
  render() {
    if (!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        欢迎{this.props.username}
        <button onClick={this.logout}>退出登录</button>
      </div>
    )
  }
}

export default connect(
  (state)=>({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {deleteUserInfo}
)(Admin)