import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postFbRequest: ["data"],
  postFbReceive: ["postFbMess"],
  getProfileRequest: ["token"],
  getProfileReceive: ["profile"],
  getListHistoryRequest:[null],
  getListHistoryReceive:["listHistory"]
});

export const FacebookTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  postFbMess: "",
  profile:{},
  token:"",
  listHistory:[]
});

export const postFbRequest = (state, action) => {
  return {
    ...state,
    data: action.data,
    postFbMess: ""
  };
};

export const postFbReceive = (state, action) => {
  return {
    ...state,
    postFbMess: action.postFbMess
  };
};

export const getProfileRequest = (state, action) => {
  return {
    ...state,
    token: action.token
  };
};

export const getProfileReceive = (state, action) => {
  return {
    ...state,
    profile: action.profile
  };
};

export const getListHistoryReceive = (state, action) => {
  return {
    ...state,
    listHistory: action.listHistory
  }
}
/* ------------- Selectors ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_FB_REQUEST]: postFbRequest,
  [Types.POST_FB_RECEIVE]: postFbReceive,
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_RECEIVE]: getProfileReceive,
  [Types.GET_LIST_HISTORY_RECEIVE]: getListHistoryReceive
});
