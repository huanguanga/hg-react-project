import React, { Component } from 'react'
import { Button,Modal } from "antd";
import screenfull from "screenfull";
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import { connect } from "react-redux";
import { deleteUserInfo } from "@/redux/actions/login";
import  "./css/header.less";
import demo from "./images/demo.jpg"

const {confirm} = Modal 

class Header extends Component {
  state={
    isFull:false
  }
  logout = ()=>{//退出登录
    confirm({
      title:'确定要退出吗?',
      icon:<ExclamationCircleOutlined/>,
      content:'渐行渐远',
      cancelText:'取消',
      okText:'确认',
      onOk:()=>{
        this.props.deleteUserInfo()
      }
    })
  }
  fullScreen = ()=>{//切换 全屏/非全屏
    screenfull.toggle()
  }
  componentDidMount(){
    screenfull.onchange(()=>{ //检测屏幕变化
      let {isFull} = this.state
      this.setState({isFull:!isFull})
    })
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
            {this.state.isFull? <FullscreenOutlined/>:<FullscreenExitOutlined/>}
          </Button>
          <span className="username">欢迎{this.props.username}</span>
          <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
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
  (state)=>({username:state.userInfo.user.username}),
  {deleteUserInfo}
)(Header)
