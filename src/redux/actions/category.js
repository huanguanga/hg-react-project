import { SAVE_CATEGORY } from "@/redux/action_types";
import { message } from "antd";
import { reqCategoryList } from "@/api";

//保存商品分类信息的同步版本
export const saveCategory = (categoryArr)=>({type:SAVE_CATEGORY,data:categoryArr})
//保存商品分类信息的异步版本
export const saveCategoryAsync = ()=>{  //如果想写一个异步的action 一定要给它匹配一个同步的action供它使用(意义不大)
  return async(dispatch)=>{  //开启异步任务
    const result = await reqCategoryList()
		const {status,data,msg} = result
		if (status === 0) {
			dispatch(saveCategory(data))
		}else{
      message.error(msg)
    }
  }
}