import {
  ADD_ALL_USER_DATA,
  ADD_USER_DATA,
  RESET_USER_DATA
} from "./userData.action";
export function userData(state = {}, action) {
  switch (action.type) {
    case ADD_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
    case ADD_ALL_USER_DATA:
      return {
        ...state,
        allUserData: {
          ...action.payload
        }
      };
    case RESET_USER_DATA:
      return {};
    default:
      return state;
  }
}
