import { SAVE_TITLE } from "@/redux/action_types";

const initState = ''

export default function (preState = initState,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
    default:
      return preState
  }
}