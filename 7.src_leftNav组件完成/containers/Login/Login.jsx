import React, { Component } from 'react'
import { connect } from "react-redux";
import { saveUserInfo } from "@/redux/actions/login";
import "./css/Login.less"
import login from "@/assets/images/logo.png"
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; //引入字体图标,每个字体图标有自己的名字
import { reqLogin } from "@/api";
import Check from "@/containers/Hoc/Check";

@connect(
  (state) =>({isLogin:state.userInfo.isLogin}),
  {saveUserInfo}
)
@Check  //由于connect装饰的是Check装饰过的Login,   所以Login不是路由组件,saveUserInfo传递给了Check,所以在login中想要使用saveUserInfo需要Check传给login(在check高阶组件中传递)
class Login extends Component {

  //表单提交且验证通过的回调
  onFinish = async values => {
    const result = await reqLogin(values)
    const {status,data,msg} = result
    if (status === 0) {
      message.success('登录成功')
      this.props.saveUserInfo(data)//向redux和local中保存数据,
      // this.props.history.replace('/admin') //由于已经有了权限判断,所以此处无用
    }else{
      message.error(msg)
    }
  };
  //自定义表单验证
  pwdValidator=(_,value="")=>{  //默认值用来防止用户什么都不输入直接点提交(自定义的表单如果什么都不输入value的值为undefined,会报错)
    //这个函数需要返回一个promise实例
    //参数value是输入的信息
    let msg = []
    // if (!value.trim()) msg.push('必填,兄弟') 
    if (!value.trim()) return Promise.reject('必填') 
    if (value.length<4) msg.push('最少填4个')
    if (value.length>12) msg.push('最多填12个')
    if (!(/^\w+$/).test(value)) msg.push('必须是英文、数字、下划线')
    if (msg.length !== 0) return Promise.reject(msg)
    else return Promise.resolve()
  }
  render() {
    // if (this.props.isLogin) return <Redirect to="/admin"/>  //这里不用this.props.history,因为它适合在非render函数中跳转,render中应该用重定向
    return (
      <div className="login">
        <header>
          <img src={login} alt=""/>
          <h1>充气娃娃管理系统</h1>
        </header>
        <section>
          <span>用户登录</span>
          <Form className="login-form" onFinish={this.onFinish}>
            <Form.Item 
              name="username"
              rules={[ //声明式表单验证
                {required:true,message:'必须填'}, //用户必须填写
                {min:4,message:'最少填4个字符'},         //最小字数限制
                {max:12,message:'最多填12个字符'},        //最大字数限制
                {pattern:/^\w+$/,message:'只能是字母,数字,下划线'}//只能是字母,数字,下划线
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
            </Form.Item>
            <Form.Item 
              name="password" 
              rules={[{validator:this.pwdValidator}]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login