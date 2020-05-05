import React, { Component } from 'react'
import { connect } from "react-redux";
import { Layout } from "antd";
import Header from "./Header/Header";
import "./css/admin.less"
import Check from "@/containers/Hoc/Check";

const {Footer,Sider,Content} = Layout 


@connect(
  (state)=>({
    isLogin:state.userInfo.isLogin
  }),
  {}
)
@Check  //连续装饰,先装饰check,再装饰connect
class Admin extends Component {
  render() {
    // if (!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <Layout className="admin-container">
        <Sider>sider</Sider>
        <Layout>
          <Header/>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin