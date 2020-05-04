import { SAVE_USERINFO } from "../action_types";

const infoState ={user:{},token:''}

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