setTimeout(() => {

  document.getElementById("loader").style.display = "none"
  document.getElementById("captcha-screen").style.display = "flex"

}, 3500)


function captchaSuccess() {

  document.getElementById("captcha-screen").style.display = "none"
  document.getElementById("site-content").style.display = "block"

}
