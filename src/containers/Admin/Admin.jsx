import React, { Component } from 'react'
import { connect } from "react-redux";
import { Switch,Route,Redirect } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header/Header";
import "./css/admin.less"
import Check from "@/containers/Hoc/Check";
import LeftNav from "./LeftNav/LeftNav";
import Home from './Home/Home'
import Category from './Category/Category'
import Product from './Product/Product'
import Role from './Role/Role'
import User from './User/User'
import Line from './Line/Line'
import Bar from './Bar/Bar'
import Pie from './Pie/Pie'

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
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content>
            <Switch>
              <Route path='/admin/home' component={Home}/>
							<Route path="/admin/prod_about/product" component={Product}/>
              <Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin