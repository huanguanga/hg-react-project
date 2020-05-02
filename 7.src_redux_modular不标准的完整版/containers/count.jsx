import Count from "../components/Count/Count";  //UI组件
import { connect } from "react-redux"; //引入connect方法
import { increment,decrement,incrementAsync } from "../redux/actions/count";//引入action


export default connect(
  state=>({count:state.count,personsCount:state.persons.length}),
  {increment,decrement,incrementAsync} //react-redux底层会将这种写法变为不精简版的写法
)(Count)
