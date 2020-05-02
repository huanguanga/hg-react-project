import Person from "../components/Person/Person";
import { connect } from "react-redux";
import { addPerson } from "../redux/actions/person";

export default connect(
  state =>({person:state.persons,count:state.count}),
  {addPerson}
)(Person)