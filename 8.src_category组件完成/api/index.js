import axios from "./ajax";
import jsonp from "jsonp"
import { CITY,WEATHER_AK } from "@/config";
import { message } from "antd";

//登录的接口请求函数,loginObj:{username:xx,password:x}
export const  reqLogin = (loginObj)=> axios.post('/login',loginObj)
//天气信息
export const reqWeather = ()=>{
  const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve)=>{ //如果此处不用promise则会出现问题(返回值需要箭头函数中的data,在外层函数中无法读取data),
    jsonp(URL,{
      timeout:2000
    },(err,data)=>{
      if (!err) {
        resolve(data.results[0].weather_data[0])
      }else{
        message.error('无法获取天气信息')
      }
    })
  })
  
}
//请求商品分类数据
export const reqCategoryList = ()=> axios.get('/manage/category/list')
//添加商品分类
export const reqAddCategoryList = categoryName=> axios.post('/manage/category/add',{categoryName})
//修改商品分类
export const reqUpdateCategoryList = (categoryId,categoryName)=> axios.post('/manage/category/update',{categoryId,categoryName})

//获取商品列表
export const reqProductList = (pageNum,pageSize) => axios.get('/manage/product/list',{params:{pageNum,pageSize}})
//搜索商品列表
export const reqSerachProduct = (serachType,keyWord,pageNum,pageSize)=>{
  return axios.get('/manage/product/search',{params:{[serachType]:keyWord,pageNum,pageSize}})
}