/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put, select } from "redux-saga/effects";
import FacebookActions from "../Redux/FacebookRedux";
import { NavigationActions } from "react-navigation";
import { Alert } from "react-native";
import loadingActiosn from "../Redux/LoadingScreenRedux";
// import { FacebookSelectors } from '../Redux/FacebookRedux'

export function* postFbSaga(api, action) {
  try {
    const res = yield call(api, action.data);
    console.log(res);
  } catch (err) {
    console.log(err.response);
  } finally {
    yield put(loadingActiosn.runLoadingScreen(false));
  }
}

export function* getProfileSaga(api, action) {
  try {
    const data = {
      token: action.token
    };
    const res = yield call(api, data);
    yield put(FacebookActions.getProfileReceive(res.data));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(loadingActiosn.runLoadingScreen(false));
  }
}

export function* getListHistorySaga(api) {
  try {
    const token = yield select(state => state.facebook.token);
    const data = {
      token
    };
    const res = yield call(api, data);
    yield put(FacebookActions.getListHistoryReceive(res.data));
    yield put(NavigationActions.navigate({ routeName: "History" }));
  } catch (err) {
    Alert.alert("fetch history error", err.message);
  } finally {
    yield put(loadingActiosn.runLoadingScreen(false));
  }
}
