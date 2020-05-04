import React, { Component } from 'react'
import { Button } from "antd";
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import {  } from "";
import { connect } from "react-redux";
import  "./css/header.less";
import demo from "./images/demo.jpg"

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button>

          </Button>
          <span className="username">欢迎,admin</span>
          <Button type="link" size="small">退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>2020年5月4日 00:00:00</span>
            <img src={demo} alt=""/>
            <span>多云转晴</span>
            <span>温度：0~15℃</span>
          </div>
          
        </div>
      </div>
    )
  }
}
export default connect(
  ()=>{},
  {}
)(Header)
