import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link,withRouter } from "react-router-dom";  //withRouter让不是路由组件的组件可以获得那三个属性
import { connect } from "react-redux";
import logo from "@/assets/images/logo.png";
import menus from "@/config/menu_config";
import { saveTitle } from "@/redux/actions/title";
import "./css/leftNav.less";

const { SubMenu,Item } = Menu;

@connect(
  ()=>({}),
  {saveTitle}
)
@withRouter
class LeftNav extends Component {

  createMenus =(menus)=>{//创建菜单的回调
    return menus.map((menuObj)=>{
      if (!menuObj.children) { //可下拉和不可下拉的两种菜单返回值不一样,所以需要判断
        return (
          <Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
            <Link to={menuObj.path}>
              <menuObj.icon/>
              {menuObj.title} 
            </Link>
          </Item>
        )
      }else{
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon/>} title={menuObj.title}>
            {this.createMenus(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }
  
  computeTitle = ()=>{ //依据路径计算title
    const {pathname} = this.props.location
    let currentKey = pathname.split('/').slice(-1)[0]
    if (currentKey === 'admin') currentKey = 'home' //此处是为了解决重新登陆首页标题丢失的情况,(出现这种情况的原因和之前重新登陆不自动首页导航项高亮的原理一样,都是由于先跳转到了admin路径又重定向到了admin/home路径下)
    if (pathname.indexOf('product') !== -1 ) currentKey = 'product'  //解决跳转product子路由tital不显示的问题
    let title = ''
    menus.forEach((menuObj)=>{
      if (menuObj.children instanceof Array) {
        const result =  menuObj.children.find((childObj)=>{
          return childObj.key === currentKey
        })
        if (result) title = result.title
      }else{
        if (currentKey === menuObj.key) title = menuObj.title
      }
    })
    this.props.saveTitle(title)
  }

  componentDidMount(){
    this.computeTitle()
  }

  render() {
    const {pathname} = this.props.location
    const openKey = pathname.split('/')  //路径拆分后的数组(这个数组可以直接传给默认展开菜单,底层会进行对比)
    let seletedKey = openKey.slice(-1)  //要选中的菜单
    if (openKey.indexOf('product') !== -1) seletedKey = 'product' //去product的子路由product也会高亮
    return (
      <div className="left-nav">
        <div className="nav-top">
          <img src={logo} alt=""/>
          <span>娃娃管理系统</span>
        </div>
        <div className="nav-bottom">
          <Menu
            // defaultSelectedKeys={seletedKey} //默认初始化选中哪个菜单
            selectedKeys={seletedKey}  //当前选中的菜单项  (因为在切换的/admin/home路径时需要先经过一层/admin路径,/admin没有对应的菜单项,用上边那个属性会有登陆后不默认选中的问题)
            defaultOpenKeys={openKey} //默认展开哪个菜单
            mode="inline" //菜单的模式
            theme="dark" //主题颜色
          >
            {this.createMenus(menus)}
          </Menu>
        </div>
      </div>
    )
  }
}
export default LeftNav
