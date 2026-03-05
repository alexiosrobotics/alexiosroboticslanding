// Show loader first, then human verification
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("captcha-screen").style.display = "flex";

  // Render Turnstile manually
  if (typeof turnstile !== "undefined") {
    turnstile.render('.cf-turnstile', {
      sitekey: '0x4AAAAAACm9nRdc_VGlsvd-',
      callback: captchaSuccess
    });
  }
}, 3500);

// Typing animation function
function typeText(element, text, speed = 50, callback) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

// User presses YES or NO
function submitHuman(answer){
  console.log("User answered:", answer);

  const captcha = document.querySelector(".cf-turnstile");

  if(answer === "yes"){
    // Show captcha immediately
    captcha.style.display = "block";
  } else {
    // Show typing error, then reveal captcha
    const errorEl = document.getElementById("error-text");
    typeText(errorEl, "ERROR: HUMAN RESPONSE REQUIRED.", 60, () => {
      captcha.style.display = "block";
    });
  }
}

// Called by Turnstile when verification is complete
function captchaSuccess(token) {
  console.log("Captcha completed, token:", token);

  document.getElementById("captcha-screen").style.display = "none";
  document.getElementById("site-content").style.display = "block";
}
