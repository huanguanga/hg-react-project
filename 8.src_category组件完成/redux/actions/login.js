import { SAVE_USERINFO,DELETE_USERINFO } from "../action_types";

export const saveUserInfo = userObj=>{
  const {user,token} = userObj
  localStorage.setItem('user',JSON.stringify(user))//将数据保存到本地
  localStorage.setItem('token',token)
  return {type:SAVE_USERINFO,data:userObj}
}
export const deleteUserInfo = () =>{
  localStorage.clear()
  return {type:DELETE_USERINFO}
}