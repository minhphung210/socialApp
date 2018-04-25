import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProfileGoogle: ["profile"],
  sendEmailRequest: ["data"],
  sendEmailReceive: ["mess"]
});

export const GoogleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  profile: {},
  data: {},
  mess: ""
});

/* ------------- Selectors ------------- */

export const getProfileGoogle = (state, action) => {
  return {
    ...state,
    profile: action.profile
  };
};

export const sendEmailRequest = (state, action) => {
  return {
    ...state,
    data: action.data,
    mess:""
  };
};

export const sendEmailReceive = (state, action) => {
  return {
    ...state,
    mess: action.mess
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_GOOGLE]: getProfileGoogle,
  [Types.SEND_EMAIL_REQUEST]: sendEmailRequest,
  [Types.SEND_EMAIL_RECEIVE]: sendEmailReceive
});
