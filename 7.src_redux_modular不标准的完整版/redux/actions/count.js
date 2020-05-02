//这个文件用来创建和count组件相关的action
//由于异步加和奇数加本质都是加,所以此处不创建,在组件中判断
import { DECREMENT,INCREMENT } from "../action_types";

//加的action
export const increment = value=> ({type:INCREMENT,data:value})
//减的action
export const decrement = value=> ({type:DECREMENT,data:value})
//异步加
/**
 * 1.特殊的action: 函数
 *    这种函数式action中往往会开启一个异步任务(定时器,ajax,promise等)
 *    也叫异步action
 * 2.该函数会交给store
 * 3.store底层加了判断,如果数函数就立刻调用,且传入store,dispatch
 * 4.总结
 *  4.1我们通常管incrementAsync叫异步action,
 *  4.2所谓的异步action就是一个函数,函数里面开启了一个异步的任务
 *  4.3异步action中往往都会用到同步action
 */
export const incrementAsync = (value,time)=>{
  return (dispatch) =>{
    setTimeout(() => {
      dispatch(increment(value))
    }, time);
  }
}