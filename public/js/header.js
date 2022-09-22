var modal = 0;

$('#open-signin').on('click', function() {
  signin();
});
$('#open-signup').on('click', function() {
  signup();
});

async function signin() {
  if (modal == 0) {
    modal = 1;
    await $("#signin").attr("style", "display:block;");
    console.log("modal-on");
  }
}
async function signup() {
  if (modal == 0) {
    modal = 1;
    await $("#signup").attr("style", "display:block;");
    console.log("modal-on");
  }
}

$(window).click(function (e) {
  if (!($(e.target).parents().hasClass("modal") || $(e.target).hasClass("modal") || $(e.target).parents().hasClass("open-modal") || $(e.target).hasClass("open-modal")) || $(e.target).hasClass("cancel")) {
    modal = 0;
    console.log("modal-off");
    $(".modal").attr("style", "display:none;");
  }
});