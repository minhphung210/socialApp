const url = "https://facebookgmailapi.herokuapp.com";
import axios from "axios";

handleUploadFile = event => {
  const data = new FormData();
  data.set("file", event.target.files[0]);
  const api = {
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    url: variable.UPLOAD_IMAGE,
    data: data
  };
  axios(api)
    .then(res =>
      this.setState({ file: res.data.data }, () => {
        console.log(res.data);
        if (!isNullOrUndefined(this.props.onChange)) {
          this.props.onChange(this.state.answer, this.state.file);
        }
      })
    )
    .catch(err => console.log(err));
};

export const postFacebookApi = data => {
  let formData = new FormData();
  formData.append("token", data.token);
  formData.append("caption", data.caption);
  formData.append("title", "");
  if (data.uri !== undefined) {
    formData.append("img", {
      uri: data.uri,
      name: "image.jpg",
      type: "multipart/form-data"
    });
  }

  const api = {
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    url: `https://facebookgmailapi.herokuapp.com/postfb`,
    data: formData
  };
  // return fetch(`https://facebookgmailapi.herokuapp.com/postfb`, {
  //   method: "POST",
  //   body: formData
  // })
  return axios(api)
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
