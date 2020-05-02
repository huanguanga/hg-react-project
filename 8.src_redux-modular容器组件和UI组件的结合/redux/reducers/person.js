import { ADDPERSON } from "../action_types";

const initState = [
  {id:"001",name:"哥哥",age:18},
  {id:"002",name:"姐姐",age:19},
]
export default function (preState=initState,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case ADDPERSON:
       newState = [data,...preState]
      return newState
    default:
      return preState
  }
}