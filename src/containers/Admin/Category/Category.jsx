import React, { Component } from 'react'
import { Card,Table,Button,Modal,Form,Input } from "antd";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { saveCategoryAsync } from "@/redux/actions/category";
// import { reqCategoryList } from "@/api";  //同步action版本的发请求
// import { saveCategory } from "@/redux/actions/category";  //同步action版本的引入

const {Item} = Form

@connect(
	(state)=>({categoryInfo:state.categoryInfo}),
	{saveCategoryAsync}
)
class Category extends Component {

	state = { visible: false };  //模态框需要的

	showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

	
//同步action版本
	// getCategoryList = async()=>{//将商品分类数据保存在redux中的方法
	// 	const result = await reqCategoryList()
	// 	const {status,data} = result
	// 	if (status === 0) {
	// 		this.props.saveCategory(data)  //由于其他组件也需要用到这个数据,所以需要把他放到redux中
	// 	}
	// }

//异步action版本
	componentDidMount (){
		this.props.saveCategoryAsync()  //调用异步action保存数据
	}

	render() {
		const dataSource = this.props.categoryInfo  //表格的数据源
		
		const columns = [//表格的列配置
			{
				title: '分类名',  //列名
				dataIndex: 'name', //数据的索引项(与数据源中的名对应)
				key: 'name', //此处key需要保证唯一(不写也没事,不是必要的属性)
			},
			{
				title:'操作',
				// dataIndex:''  //由于此处所有数据的操作列的内容都一样,儿数据源中不可能返回那么多相同的数据,所以此处用render来操作
				render:()=><Button type="link">修改分类</Button>, //render是高级渲染,函数的返回值展示到页面
				width:'20%', //列宽
				align: 'center' //列对其方式
			}
		];

		return (
			<div>
				<Card extra={
					<Button type="primary" onClick={this.showModal}>
						<PlusOutlined />
						添加分类
					</Button>
				}>
					<Table 
						dataSource={dataSource}  //数据源
						columns={columns}  //列配置
						bordered= {true}  //展示边框 也可以直接写bordered	省略  = {true}
						rowKey = '_id'  //配置唯一标识对应的名
						pagination = {{
							pageSize:4,
						}}
					/>;
				</Card>
				<Modal
          title="增加分类"
          visible={this.state.visible}  //控制弹窗是否展示(有state数据决定)
          onOk={this.handleOk}     //点击确认的回调
          onCancel={this.handleCancel}  //点击取消的回调
        >
          <Form>
						<Item 
							name='category'
							rules={[  //rules必须配合name一起使用,否则无效
								{required: true,message:'必输项'}
							]}
						>
							<Input placeholder="输入分类名"/>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
export default Category
