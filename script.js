// UPDATE YEAR
////////////////
const yearEl = document.querySelector(".year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// MOBILE NAVIGATION
//////////////////////////
const btnNavEl = document.querySelector(".btn-mobile--nav");
const headerEl = document.querySelector(".header");
if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", () =>
    headerEl.classList.toggle("nav-open"),
  );
}

// LINK ACTIVATION
////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".main-nav--link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});

// CONTACT FORM
/////////////////
const form = document.getElementById("form");

if (form) {
  const submitBtn = form.querySelector("button[type='submit']");
  const SUBMIT_LABEL = submitBtn?.textContent ?? "Send Message";

  const messageDiv = Object.assign(document.createElement("div"), {
    id: "form-message",
  });
  messageDiv.style.marginTop = "16px";
  form.appendChild(messageDiv);

  const setMessage = (text, color) => {
    messageDiv.textContent = text;
    messageDiv.style.color = color;
  };

  const setSubmitState = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? "Sending..." : SUBMIT_LABEL;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setSubmitState(true);

    const formData = new FormData(form);

    if (formData.get("website")) {
      setSubmitState(false);
      return;
    }

    setMessage("Sending message…", "#adb5bd");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });
      const result = await response.text();

      if (result.trim() === "success") {
        setMessage("Your message has been sent successfully!", "#fff");
        form.reset();
      } else {
        setMessage(
          "An error occurred. Please check your information and try again.",
          "red",
        );
      }
    } catch {
      setMessage(
        "A network error occurred. Please check your connection.",
        "#ff8787",
      );
    } finally {
      setSubmitState(false);
    }
  });
}
