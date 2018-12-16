export const ADD_USER_DATA = "ADD_USER_DATA";
export const ADD_ALL_USER_DATA = "ADD_ALL_USER_DATA";
export const RESET_USER_DATA = "RESET_USER_DATA";
export const addUserData = params => ({
  type: ADD_USER_DATA,
  payload: params
});

export const resetUserData = () => ({
  type: RESET_USER_DATA
});

export const addAllUser = params => ({
  type: ADD_ALL_USER_DATA,
  payload: params
});
