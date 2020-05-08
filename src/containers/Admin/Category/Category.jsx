import React, { Component } from 'react'
import { Card,Table,Button,Modal,Form,Input,message } from "antd";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { saveCategoryAsync } from "@/redux/actions/category";
import { reqAddCategoryList,reqUpdateCategoryList } from "@/api";
// import { reqCategoryList } from "@/api";  //同步action版本的发请求
// import { saveCategory } from "@/redux/actions/category";  //同步action版本的引入

const {Item} = Form

@connect(
	(state)=>({categoryInfo:state.categoryInfo}),
	{saveCategoryAsync}
)
class Category extends Component {

	state = { visible: false };  //模态框需要的

	showModal = (categoryObj) => {  //显示模态框 (此处的新增分类和修改分类共用这个回调)
		const {categoryName} = this.refs
		this._id = ''
		this.name = '' 
		this.isUpdata = false
		const  {_id,name} = categoryObj
		if (_id&&name) {
			this._id = _id
			this.name = name 
			this.isUpdata = true
			// if (this.refs.categoryName) {  //加这个判断的原因是在this.setState({visible: true,})没有执行的时候是获取不到this.refs.categoryName的,得至少先执行一次显示模态框才能获取到categoryName
			// 	this.refs.categoryName.setFieldsValue({category:this.name})  //setFieldsValue是4.0版本新出的api,可以代替重置表单直接给表单项设置值
			// 	console.log(this.name)
			// }
		}
		if (categoryName) categoryName.setFieldsValue({category:this.name})  
    this.setState({visible: true,});
  };

	handleOk = async() => {  //模态框确定回调
		const {categoryName} = this.refs
		const {category} = categoryName.getFieldsValue()
		//验证表单信息(由于确定按钮不是在form表单中的,所以不管表单验证是否通过,都会执行这个回调)
		let result 
		if (!category || !category.trim()) {
			message.warning('分类名不能为空')
		}else{
			//获取表单数据并发送请求
			if (this.isUpdata) {
				result = await reqUpdateCategoryList(this._id,category)
			}else{
				result = await reqAddCategoryList(category)
			}
			const {status,msg} = result
			if (status === 0) {
				message.success(this.isUpdata? '修改分类成功':'添加分类成功')
				this.props.saveCategoryAsync()  //成功则重新保存数据到redux
				this.setState({visible: false,}); //隐藏弹窗
			}else{
				message.error(msg)
			}
			categoryName.resetFields()//重置表单
		}
  };

	handleCancel = e => {//模态框取消回调
		const {categoryName} = this.refs
		this.setState({visible: false,});
		categoryName.resetFields()//重置表单
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
				//dataIndex:'name',  //由于此处所有数据的操作列的内容都一样,儿数据源中不可能返回那么多相同的数据,所以此处用render来操作
				render:(categoryObj)=><Button    //如果存在dataIndex则这里的a就是dataIndex指定的项,如果没有dataIndex则这里的参数a是当前项分类的详细信息
					type="link" 
					onClick={()=>{
						return this.showModal(categoryObj)
					}}>
						修改分类
				</Button>, //render是高级渲染,函数的返回值展示到页面
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
          title={this.isUpdata ? '修改分类':'新增分类'}
          visible={this.state.visible}  //控制弹窗是否展示(有state数据决定)
          onOk={this.handleOk}     //点击确认的回调
          onCancel={this.handleCancel}  //点击取消的回调
        >
          <Form ref="categoryName" initialValues={{category:this.name}}>
						<Item 
							name='category'
							rules={[  //rules必须配合name一起使用,否则无效
								{required: true,message:'必输项'}
							]}
						>
							<Input  placeholder="输入分类名"/>  
							{/**此处要获取Input中的内容不应该在input身上打ref(如果有N个input难道要打N个ref?),
							 * 由于input在form表单中,所以给form表单打ref标签*/}
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
export default Category
