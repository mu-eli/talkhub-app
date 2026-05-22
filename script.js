const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

const btnNavEl = document.querySelector(".btn-mobile--nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".main-nav--link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});

const form = document.getElementById("form");

const messageDiv = document.createElement("div");
messageDiv.id = "form-message";
messageDiv.style.marginTop = "1rem";
form.appendChild(messageDiv);

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(form);

  if (formData.get("website")) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
    return;
  }

  const recaptchaResponse =
    typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "";
  if (typeof grecaptcha !== "undefined" && !recaptchaResponse) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Please verify you are not a robot.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
    return;
  }

  messageDiv.style.color = "#333";
  messageDiv.textContent = "Sending message...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    if (result.trim() === "success") {
      messageDiv.style.color = "white";
      messageDiv.textContent = "Your message has been sent successfully!";
      form.reset();

      if (typeof grecaptcha !== "undefined") grecaptcha.reset();
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent =
        "An error occurred. Please check your information and try again.";
    }
  } catch (error) {
    messageDiv.style.color = "red";
    messageDiv.textContent =
      "A network error occurred. Please check your connection.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
