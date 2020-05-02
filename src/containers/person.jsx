import React, { Component } from 'react'
import { connect } from "react-redux";
import { addPerson } from "../redux/actions/person";
import { v4 as uuidv4 } from "uuid";

class Person extends Component {
  add=()=>{
    const {nameNode,ageNode} = this.refs
    const name = nameNode.value
    const age = ageNode.value
    if (!name.trim() || !age.trim()) {
      alert('请别输入空')
      return 
    }
    const personObj = {id:uuidv4(),name,age}
    this.props.addPerson(personObj)
    nameNode.value = ''
    ageNode.value = ''
  }
  render() {
    return (
      <div>
        <h1>当前总人数:{this.props.person.length},总和为{this.props.count}</h1>
        <input ref="nameNode" type="text" placeholder="输入名字"/>
        <input ref="ageNode" type="text" placeholder="输入年龄"/>
        <button onClick={this.add}>添加</button>
        <ul>
          {this.props.person.map((per)=><li key={per.id}>姓名:{per.name},年龄:{per.age}</li>)}
        </ul>
      </div>
    )
  }
}
export default connect(
  state =>({person:state.persons,count:state.count}),
  {addPerson}
)(Person)