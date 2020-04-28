import axios from "./ajax";


//登录的接口请求函数,loginObj:{username:xx,password:x}
export const  reqLogin = (loginObj)=> axios.post('/login',loginObj)

