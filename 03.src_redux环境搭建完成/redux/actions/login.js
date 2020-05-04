import { SAVE_USERINFO } from "../action_types";

export const saveUserInfo = userObj=>({type:SAVE_USERINFO,data:userObj})