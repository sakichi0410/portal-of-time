var modal = 0;

$('#signin').on('click', function() {
  signin();
});
$('#signup').on('click', function() {
  signup();
});

async function signin() {
  if (modal == 0) {
    modal = 1;
    await $("#modal").attr("style", "display:block;");
    await $("#modal").load("../views/signin.html");
  }
}
async function signup() {
  if (modal == 0) {
    modal = 1;
    $("#modal").attr("style", "display:block;");
    $("#modal").load("../views/signup.html");
  }
}

$(window).click(function (e) {
  if ((!$(e.target).parents().hasClass("modals") && modal == 1 && !$(e.target).hasClass("modals")) || $(e.target).hasClass("cancel")) {
    modal = 0;
    $("#modal").attr("style", "display:none;");
  }
});