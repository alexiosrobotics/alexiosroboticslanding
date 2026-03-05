// Show loader first, then human verification
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("captcha-screen").style.display = "flex";

  const promptEl = document.querySelector(".prompt");
  const buttons = document.querySelector(".human-buttons");

  // Type the "ARE YOU HUMAN?" text first
  typeText(promptEl, "ARE YOU HUMAN?", 60, () => {
    // Once typing is done, fade in buttons
    buttons.classList.add("show");
  });
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
  const buttons = document.querySelector(".human-buttons");
  buttons.classList.remove("show");

  const captchaContainer = document.getElementById("turnstile-container");
  const errorEl = document.getElementById("error-text");

  if(answer === "no") {
    // Show error typing, do NOT show captcha or site
    typeText(errorEl, "ERROR: HUMAN RESPONSE REQUIRED.", 60);

    document.getElementById("captcha-screen").style.display = "flex";
    document.getElementById("site-content").style.display = "none";
  } else {
    // render if YES
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

// Called when captcha is successfully completed
function captchaSuccess(token) {
  console.log("Captcha completed, token:", token);
  document.getElementById("captcha-screen").style.display = "none";
  document.getElementById("site-content").style.display = "block";
}
