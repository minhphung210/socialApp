const url = "https://facebookgmailapi.herokuapp.com";
import axios from "axios";

export const postFacebookApi = data => {
  let formData = new FormData();
  formData.append("token", data.token);
  formData.append("caption", data.caption);
  if (data.uri !== undefined) {
    formData.append("img", {
      uri: data.uri,
      name: "image.jpg",
      type: "multipart/form-data"
    });
  }

  console.log(formData);
  return fetch(`https://facebookgmailapi.herokuapp.com/postfb`, {
    method: "POST",
    body: formData
  })
    .then(res => res)
    .catch(err => err);
};

export const getProfileApi = data => {
  return axios
    .post(`https://facebookgmailapi.herokuapp.com/getData`, data)
    .then(res => res)
    .catch(err => err);
};

export const getListHistoryApi = token => {
  return axios
    .post("https://facebookgmailapi.herokuapp.com/timestamp", token)
    .then(res => res)
    .catch(err => err);
};
