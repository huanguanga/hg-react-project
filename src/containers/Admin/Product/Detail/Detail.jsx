import React, { Component } from 'react'
import { Button,Card,List,message } from "antd";
import { connect } from "react-redux";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqProductDetail } from "@/api";
import { saveCategoryAsync } from "@/redux/actions/category";
import { IMAGE_BASE_URL } from "@/config";
import "./css/detail.less"

const {Item} = List

@connect(
  (state)=>({categoryInfo:state.categoryInfo}),
  {saveCategoryAsync}
)
class Detail extends Component {

  state = {
    productDetail:{imgs:[]}  //商品详情 (第一次挂载时imgs是undefined,会导致在遍历imgs时报错,在此处给它赋初值就不会发生这个错误了)
  }

  getProductDetail = async(id)=>{  //请求商品详情的回调
    const result = await reqProductDetail(id)
    const {status,data,msg} = result 
    if (status === 0) {
      this.setState({productDetail:data})
      // message.success('获取数据详情成功')
    }else{
      message.error(msg)
    }
  }

  findCategoryInfo = (categoryId)=>{  //依据分类ID获取分类详细信息
    const result = this.props.categoryInfo.find((categoryItem)=>{
      return categoryId === categoryItem._id
    })
    if (result) return result.name
  }

  componentDidMount(){
    const {match,categoryInfo,saveCategoryAsync} = this.props
    if (categoryInfo.length === 0) {  //如果reudx中没有categoryInfo则获取其
      saveCategoryAsync()
    }
    const {id} = match.params
    this.getProductDetail(id)  //请求详细信息
  }

  render() {
    const {name,desc,price,categoryId,imgs,detail} = this.state.productDetail
    return (
      <Card 
        title={
          <div>
            <Button type="link" onClick={this.props.history.goBack}>
              <ArrowLeftOutlined />
            </Button>
            <span>商品详情</span>
          </div>
        }
      >
        <List>
          <Item className="item">
            <span className="title">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item className="item">
            <span className="title">商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item className="item">
            <span className="title">商品价格：</span>
            <span>{`￥${price}`}</span>
          </Item>
          <Item className="item">
            <span className="title">商品分类：</span>
            <span>{this.findCategoryInfo(categoryId)}</span>
          </Item>
          <Item className="item">
            <span className="title">商品图片：</span>
            {
              imgs.map((img)=>{
                return <img key={img} src={IMAGE_BASE_URL+img} alt="2"/>
              })
            }
          </Item>
          <Item className="item">
            <span className="title">商品详情：</span>
            <span dangerouslySetInnerHTML = {{__html:detail}}/>  {/**在react中innerHTML的替代方案dangerouslySetInnerHTML = {{__html:detail}} */}
          </Item>
        </List>
      </Card>
    )
  }
}
export default Detail
