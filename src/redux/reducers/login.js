import { SAVE_USERINFO } from "../action_types";

let user 
try {
  user = JSON.parse(localStorage.getItem('user'))
} catch (error) {
  user = {}
}
let token 
try {
  token = localStorage.getItem('token')
} catch (error) {
  token = ''
}

const infoState ={
  user:user||{},
  token:token || ''
}

export default function (preStore=infoState,action) {
  const {type,data} = action
  let newStore
  switch (type) {
    case SAVE_USERINFO:
      
      newStore = {...data}
      return newStore
    default:
      return preStore
  }
}