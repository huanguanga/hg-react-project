import React, { Component } from 'react'
import { Button,Modal } from "antd";
import dayjs from "dayjs";
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
import { reqWeather } from "@/api/index";

const {confirm} = Modal 

@connect(
  (state)=>({
    username:state.userInfo.user.username,
    title:state.title
  }),
  {deleteUserInfo}
)
class Header extends Component {
  state={
    isFull:false,
    time:dayjs().format('YYYY年MM月DD日 HH:mm:ss '),
    weatherData:{} //天气信息
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
   getWeather = async()=>{//获取天气信息
    const result = await reqWeather()
    const {dayPictureUrl,weather,temperature} = result
    this.setState({weatherData:{dayPictureUrl,weather,temperature}})
  }
  componentDidMount(){
    screenfull.onchange(()=>{ //检测屏幕变化
      let {isFull} = this.state
      this.setState({isFull:!isFull})
    })
    this.timer = setInterval(() => {//时间的定时器
      this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss ')})
    }, 1000);
    this.getWeather()//获取天气信息
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    const {weatherData} = this.state
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
            <span>{this.props.title}</span>
          </div>
          <div className="bottom-right">
            <span>{this.state.time}</span>
            <img src={demo} alt={weatherData.dayPictureUrl}/>
            <span>{weatherData.weather}</span>
            <span>{weatherData.temperature}</span>
          </div>
          
        </div>
      </div>
    )
  }
}
export default Header
