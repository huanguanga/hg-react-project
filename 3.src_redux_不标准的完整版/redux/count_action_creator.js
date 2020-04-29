//这个文件用来创建和count组件相关的action
//由于异步加和奇数加本质都是加,所以此处不创建,在组件中判断
import { DECREMENT,INCREMENT } from "./action_types";

//加的action
export const createIncrementAction = value=> ({type:INCREMENT,data:value})
//减的action
export const createDecrementAction = value=> ({type:DECREMENT,data:value})