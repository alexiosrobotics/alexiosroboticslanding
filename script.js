// Show loader first, then human verification
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("captcha-screen").style.display = "flex";

  // No need to render Turnstile here — wait for user click
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

let turnstileRendered = false;

// User presses YES or NO
function submitHuman(answer) {
  console.log("User answered:", answer);

  // Hide buttons immediately
  document.querySelector(".human-buttons").style.display = "none";

  const captchaContainer = document.getElementById("turnstile-container");

  if(answer === "no") {
    // Show error typing before showing captcha
    const errorEl = document.getElementById("error-text");
    typeText(errorEl, "ERROR: HUMAN RESPONSE REQUIRED.", 60, () => {
      showCaptcha(captchaContainer);
    });
  } else {
    showCaptcha(captchaContainer);
  }
}

// Render Turnstile captcha only once
function showCaptcha(container) {
  container.style.display = "block";

  if(!turnstileRendered) {
    turnstile.render(container, {
      sitekey: "0x4AAAAAACm9nRdc_VGlsvd-",
      callback: captchaSuccess
    });
    turnstileRendered = true;
  }
}

function captchaSuccess(token) {
  console.log("Captcha completed, token:", token);
  document.getElementById("captcha-screen").style.display = "none";
  document.getElementById("site-content").style.display = "block";
}
