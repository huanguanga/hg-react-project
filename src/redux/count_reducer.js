//这个函数是为count组件服务的reducer,是真正操纵状态的人  厨师
//1 + n  的执行方式
import { DECREMENT,INCREMENT } from "./action_types";

export default function (preState=0,action) {//prestate是上一次的状态,action是动作对象 {type:'',data:''}
  const { type,data } = action
  let newState = ''
  switch (type) {//这里约定用switch判断,
    //动作类型加
    case INCREMENT:
      newState = preState + data
      return newState
    //动作类型减
    case DECREMENT:
      newState = preState - data
      return newState
    //动作类型不是加也不是减初始化
    default:
      return preState
  }
}