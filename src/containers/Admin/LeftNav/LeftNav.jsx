import React, { Component } from 'react'
import { Menu } from 'antd';
import logo from "@/assets/images/logo.png";
import menus from "@/config/menu_config";
import "./css/leftNav.less";

const { SubMenu,Item } = Menu;



export default class LeftNav extends Component {
  createMenus =(menus)=>{//创建菜单的回调
    return menus.map((menuObj)=>{
      if (!menuObj.children) { //可下拉和不可下拉的两种菜单返回值不一样,所以需要判断
        return (
          <Item key={menuObj.key} icon={<menuObj.icon/>}>
            {menuObj.title}
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
  render() {
    return (
      <div className="left-nav">
        <div className="nav-top">
          <img src={logo} alt=""/>
          <span>娃娃管理系统</span>
        </div>
        <div className="nav-bottom">
          <Menu
            defaultSelectedKeys={['home']} //默认选中哪个菜单
            defaultOpenKeys={[]} //默认展开哪个菜单
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
