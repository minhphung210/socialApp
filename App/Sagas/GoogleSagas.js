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

import { call, put } from "redux-saga/effects";
import GoogleActions from "../Redux/GoogleRedux";
import LoadingActions from "../Redux/LoadingScreenRedux";
// import { GoogleSelectors } from '../Redux/GoogleRedux'

export function* sendEmailSaga(api, action) {
  try {
    const { data } = action;
    // get current data from Store
    // const currentData = yield select(GoogleSelectors.getData)
    // make the call to the api
    const response = yield call(api, data);
    console.log("res", response);
    if (response.status === 200) {
      yield put(GoogleActions.sendEmailReceive(response.data));
    } else {
      yield put(
        GoogleActions.sendEmailReceive(`error status ${response.status}`)
      );
    }
  } catch (err) {
    console.log(err);
    yield put(GoogleActions.sendEmailReceive(err.messaga));
  } finally {
    yield put(LoadingActions.runLoadingScreen(false));
  }
}
