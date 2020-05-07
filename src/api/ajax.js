/**
 * axios的二次封装,
 * 	1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
		5.统一处理错误
 */
import axios from "axios";
import nprogress from "nprogress"; //进度条的库
import "nprogress/nprogress.css"; //引入进度条的样式
import qs from "querystring";  //脚手架中默认有这个库,这个库可以将对象转换为urlencoded格式
import { message } from "antd"; //全局message提示
import store from "@/redux/store";
import { deleteUserInfo } from "@/redux/actions/login";

//配置请求的基础路径和超时时间    此处用了defaults方式,也可以使用axios.create()的方式,这种方式的优点就是可以写多个
axios.defaults.baseURL= 'http://localhost:3000'
axios.defaults.timeout = 2000

//请求拦截器(拦截器就是将配置对象做一个处理)
axios.interceptors.request.use((config)=>{//config中包含请求的所有详细信息
  //由于服务器的登录接口只能处理rulencoded形式的请求体参数,所以需要将传入的内容转换为这种形式
  nprogress.start()
  const {method,data} = config  
  
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data) //将对象转换为urlencoded格式
  }
  const {token} = store.getState().userInfo//获取redux中的token
  if (token) {
    config.headers.Authorization = 'atguigu_'+ token  //API文档规定
  }
  return config 
})
//响应拦截器
axios.interceptors.response.use(
  //成功的回调
  response =>{
    //统一返回data
    nprogress.done()
    return response.data
  },
  //失败的回调
  error =>{ //失败需要返回一个失败的promise,  
    nprogress.done()
    let msg = ''
    const err = error.message
    console.log(err)
    if (err.indexOf('timeout') !== -1) msg ='登录超时了,你网不好'
    if(err.indexOf('Network Error') !== -1) msg = '估计你是没网了'
    if(err.indexOf('401') !== -1) {
      //token过期处理,强制退出,返回login,并且练习rendux删除所有用户信息
      store.dispatch(deleteUserInfo())
      msg = '未登录或身份过期,请重新登录'
    }
    message.error(msg)
    return new Promise(()=>{})
  }
)
export default axios