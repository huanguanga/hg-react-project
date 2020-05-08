import React, { Component } from 'react'
import { Card,Button,Select,Input,Table,message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { reqProductList,reqSerachProduct } from "@/api";
import { PAGESIZE } from "@/config";


const {Option} = Select

export default class Product extends Component {

	state={
		productList:[],  //商品列表数据
		total:0,//数据总数
		pageNum:0, //当前页码
		serachType:'productName', //搜索的类型
		keyWord:''  //搜索关键字
	}

	getProductList = async (pageNum = 1)=>{  //请求商品列表和搜索商品列表
		let result
		if (this.isSearch) {  //搜索的情况
			const {serachType,keyWord} = this.state
			result = await reqSerachProduct(serachType,keyWord,pageNum,PAGESIZE)
		}else{//初始化的情况
			result = await reqProductList(pageNum,PAGESIZE)
		}
		const {status,data,msg} = result
		if (status === 0) {
			this.setState({productList:data.list,total:data.total,pageNum:data.pageNum})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		this.getProductList()//请求商品列表
	}

	handleChange = (value) => {  //选择框改变的回调
		this.setState({serachType:value})
	}

	render() {
		const dataSource = this.state.productList
		
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
			},
			{
				title: '状态',
				dataIndex: 'status',
				align:'center',
				render:(status)=>{
					return (
						<div>
							<Button type={status === 1? 'danger':'primary'}>{status === 1? '下架':'上架'}</Button><br/>
							<span>{status === 1? '在售':'已停售'}</span>
						</div>
					)
				},
				key: 'address',
			},
			{
				title: '操作',
				// dataIndex: 'address',
				align:'center',
				render:()=> (
					<div>
						<Button type="link">详情</Button><br/>
						<Button type="link">修改</Button>
					</div>
				),
				key: 'address',
			},
		];
		return (
			<Card 
				title={
					<div>
						<Select defaultValue="productName" onChange={this.handleChange}>
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input 
							style={{width:'20%',margin:'0 10px'}} 
							placeholder="请输入搜索关键字"
							allowClear  //可以点击清除图标删除内容
							onChange={(event)=>this.setState({keyWord:event.target.value})}//	输入框内容变化时的回调
						/>
						<Button 
							type="primary" 
							onClick={()=>{
								this.isSearch = true
								this.getProductList()
							}}
						>
							<SearchOutlined />搜索
						</Button>
					</div>
				} 
				extra={<Button type="primary">添加商品</Button>}
			>
				<Table 
					dataSource={dataSource} 
					columns={columns} 
					rowKey='_id' 
					pagination={{
						total:this.state.total, //数据总数
						pageSize:PAGESIZE, //每页条数
						current:this.state.pageNum,  //当前显示的页数(为了解决页码不高亮显示的BUG)
						onChange:(page)=>{ //页码改变的回调
							this.getProductList(page)
						}
					}}
				/>
			</Card>
		)
	}
}
