import { ADDPERSON } from "../action_types";

export const addPerson = personObj=>({type:ADDPERSON,data:personObj})