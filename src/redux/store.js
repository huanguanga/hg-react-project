import { createStore } from 'redux'
import {  } from "./count_action_creator";
import countReducer from "./count_reducer";


export default createStore(countReducer)