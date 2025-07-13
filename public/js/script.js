var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwMfSrVH5aeCOdOtXY7Oxt33c63vtwVIkAdh6fCeUwfM8rawNlDJbWxAYfGhZ6wMW0vvg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Submitted successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

// Custom dialog for contact form
function showContactDialog(message, type = "success") {
  const dialog = document.getElementById("contact-dialog");
  const dialogMessage = document.getElementById("contact-dialog-message");
  const dialogIcon = document.getElementById("contact-dialog-icon");

  let icon = "";
  if (type === "success") {
    icon = "<span style='font-size:48px;color:#4BB543;'>✔️</span>";
  } else if (type === "error") {
    icon = "<span style='font-size:48px;color:#ff004f;'>❌</span>";
  } else if (type === "warning") {
    icon = "<span style='font-size:48px;color:#FFC107;'>⚠️</span>";
  }
  dialogIcon.innerHTML = icon;
  dialogMessage.textContent = message;
  dialog.classList.add("show");
  setTimeout(() => {
    dialog.classList.remove("show");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // You can add AJAX/fetch here if needed
      showContactDialog("Message sent successfully!", "success");
      contactForm.reset();
    });
  }
});

window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
