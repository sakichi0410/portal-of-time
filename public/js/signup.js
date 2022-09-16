import { httpPost } from './index.js';

var url = window.location.search;
var url_value = url.split("=");
var result = 0;
var empty = 0;

$("#user-form").on("change", async function () {
  const data = {
    name: $("#name").val(),
    email: $("#email").val(),
  };
  const response = await httpPost(
    "//" + window.location.host + "/api/user/signup/check",
    data
  );
  if (
    $("#name").val() != "" &&
    $("#email").val() != "" &&
    $("#password").val() != ""
  ) {
    empty = 1;
  } else {
    empty = 0;
  }
  result = response.result;
  if (result != 0) {
    $("#signup_err").text("登録済みのメールアドレスです");
  } else {
    $("#signup_err").text("");
  }
});

$("#regist").on("click", async function () {
  const data = {
    name: $("#name").val(),
    email: $("#email").val(),
    password: $("#password").val(),
  };
  if (result != 0) {
    $("#signup_err").text("登録済みのメールアドレスです");
  }
  if (empty != 1) {
    $("#signup_err").text("未入力の項目があります");
  }
  if (result == 0 && empty == 1) {
    const response = await httpPost(
      "//" + window.location.host + "/api/user/signup/create",
      data
    );
    console.log(response);
    if (url_value[2]) {
      location.href = url_value[0] + "=" + response.user_id + "=" + url_value[2];
    } else {
      location.href = url_value[0] + "=" + response.user_id;
    }
  }
});

$("#reset").on("click", async function () {
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
  $("#signup_err").text("");
});