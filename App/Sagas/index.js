import { takeLatest, all } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { FacebookTypes } from "../Redux/FacebookRedux";
import { GoogleTypes } from "../Redux/GoogleRedux";

/* ------------- Sagas ------------- */

import {
  postFbSaga,
  getProfileSaga,
  getListHistorySaga
} from "./FacebookSagas";
import { sendEmailSaga } from "./GoogleSagas";
/* ------------- API ------------- */
import {
  postFacebookApi,
  getProfileApi,
  getListHistoryApi
} from "../Services/Api/Facebook";
import { sendEmailApi } from "../Services/Api/Google";
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(FacebookTypes.POST_FB_REQUEST, postFbSaga, postFacebookApi),

    takeLatest(
      FacebookTypes.GET_PROFILE_REQUEST,
      getProfileSaga,
      getProfileApi
    ),

    takeLatest(
      FacebookTypes.GET_LIST_HISTORY_REQUEST,
      getListHistorySaga,
      getListHistoryApi
    ),

    takeLatest(GoogleTypes.SEND_EMAIL_REQUEST, sendEmailSaga, sendEmailApi)
  ]);
}
