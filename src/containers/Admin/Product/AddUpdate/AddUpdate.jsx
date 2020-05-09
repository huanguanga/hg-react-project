import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button,Card,Form,Input,Select } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { saveCategoryAsync } from "@/redux/actions/category";

const {Item} = Form
const {Option} = Select

@connect(
  (state)=>({categoryInfo:state.categoryInfo}),
  {saveCategoryAsync}
)
class AddUpdate extends Component {

  state={
    categoryList:[]
  }

  handleChange = (value) => {  //多选框改变的回调
    console.log(`selected ${value}`);
  }

  onFinish = ()=>{  //表单提交的回调
    
  }

  componentDidMount(){
    if (this.props.categoryInfo.length === 0) {
      this.props.saveCategoryAsync()
    }
  }

  render() {
    return (
      // <div>
      //   添加和修改组件...
      //   <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      // </div>
      <Card 
        title={
          <div>
            <Button type="link">
              <ArrowLeftOutlined/>
            </Button>
            <span>商品添加</span>
          </div>
        }
      >
        <Form
          initialValues={{categoryId:''}}
          onFinish={this.onFinish}
        >
          <Item
            name="name"
            label="商品名称"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            rules={[
              {required:true,message:'必输项'}
            ]}
          >
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item
            name="desc"
            label="商品描述"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            rules={[
              {required:true,message:'必输项'}
            ]}
          >
            <Input placeholder="请输入商品描述"/>
          </Item>
          <Item
            name="price"
            label="商品价格"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            rules={[
              {required:true,message:'必输项'}
            ]}
          >
            <Input 
              placeholder="请输入商品价格"
              prefix="￥"
              addonAfter="元"
              type='number'
            />
          </Item>
          <Item
            name="categoryId"
            label="商品分类"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            rules={[
              {required:true,message:'必输项'}
            ]}
          >
            <Select onChange={this.handleChange}>
              <Option value="">请选择分类</Option>
              {
                this.props.categoryInfo.map((categoryItem)=>{
                  return <option value={categoryItem._id} key={categoryItem._id}>{categoryItem.name}</option>
                })
              }
            </Select>
          </Item>
          <Item
            // name="name"
            label="商品图片"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            style={{marginLeft:'12px'}}
          >
            <span>此处放置图片上传组件</span>
          </Item>
          <Item
            // name="name"
            label="商品名称"
            wrapperCol={{span:8}}  //表单中的栅格系统,wrapper代表输入框区域  label代表输入框前边的文本区域 用wrapperCol和labelCol可以设置栅格
            style={{marginLeft:'12px'}}
          >
            <span>此处放置富文本编辑器</span>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default AddUpdate