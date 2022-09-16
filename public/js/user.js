var url = window.location.search;
var url_value = url.split("=");

if (url_value[1]==0) {
  $("#header").load("header-logout.html");
} else {
  $("#header").load("header-login.html");
}