import { httpPost } from './index.js';

var url = window.location.search;
var url_value = url.split("=");
var empty = 0;

$("#user-form").on("change", async function () {
  if ($("#email").val() != "" && $("#password").val() != "") {
    empty = 1;
  } else {
    empty = 0;
  }
});

$("#login").on("click", async function () {
  const data = {
    email: $("#email").val(),
    password: $("#password").val(),
  };
  if (empty != 1) {
    $("#signin_err").text("未入力の項目があります");
  } else {
    const response = await httpPost(
      "//" + window.location.host + "/api/user/signin",
      data
    );
    if (response.user_id == 0) {
      $("#signin_err").text("メールアドレスまたはパスワードが間違っています");
    } else {
      var query = window.location.search;
      var value = query.split("=");
      if (value[2]) {
        location.href = value[0] + "=" + response.user_id + "=" + value[2];
      } else {
        location.href = value[0] + "=" + response.user_id;
      }
    }
  }
});

$("#reset").on("click", async function () {
  $("#email").val("");
  $("#password").val("");
  $("#signup_err").text("");
});