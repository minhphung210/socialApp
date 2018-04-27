import axios from "axios";

export const sendEmailApi = data => {
    let formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("receivers", data.receivers);
    formData.append("content", data.content);
    console.log(data);
    if (data.img !== undefined) {
      formData.append("img", {
        uri: data.img,
        name: "image.jpg",
        type: "multipart/form-data"
      });
    }
    formData.append("pass", data.pass);
    formData.append("user", data.user);
  
    const api = {
      headers: { "Content-Type": "multipart/form-data",
                // "Content-Transfer-Encoding":"QUOTED-PRINTABLE"
              },
      method: "post",
      url: `https://facebookgmailapi.herokuapp.com/sendmail`,
      // url:"http://localhost:6969/sendmail",
      data: formData
    };
    return axios(api)
      .then(res => res)
      .catch(err => err);
  };