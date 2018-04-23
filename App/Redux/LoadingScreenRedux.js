import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  runLoadingScreen: ["run"],
  runLoadingCompo: ["runLoadingC"]
});

export const LoadingScreenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  run: false,
  runLoadingC: false
});

/* ------------- Selectors ------------- */

export const runLoadingScreen = (state, action) => {
  return {
    ...state,
    run: action.run
  };
};

export const runLoadingCompo = (state, action) => {
  return {
    ...state,
    runLoadingC: action.runLoadingC
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RUN_LOADING_SCREEN]: runLoadingScreen,
  [Types.RUN_LOADING_COMPO]: runLoadingCompo
});
