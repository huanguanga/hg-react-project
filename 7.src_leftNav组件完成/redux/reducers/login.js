import { SAVE_USERINFO,DELETE_USERINFO } from "../action_types";

let _user 
try {
  _user = JSON.parse(localStorage.getItem('user'))
} catch (error) {
  _user = null
}
let _token = localStorage.getItem('token')

const infoState ={
  user:_user||{},
  token:_token || '',
  isLogin:_user && _token ? true:false
}

export default function (preStore=infoState,action) {
  const {type,data} = action
  let newStore
  switch (type) {
    case SAVE_USERINFO:
      newStore = {...data,isLogin:true}
      return newStore
    case DELETE_USERINFO:
      newStore = {user:{},token:'',isLogin:false}
      return newStore
    default:
      return preStore
  }
}