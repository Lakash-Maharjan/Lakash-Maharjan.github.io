// Form functionality for form.ejs

function showForm(category) {
  // Hide all forms first
  document.getElementById("skills-form").style.display = "none";
  document.getElementById("experience-form").style.display = "none";
  document.getElementById("education-form").style.display = "none";

  // Show the selected form
  document.getElementById(category + "-form").style.display = "block";
}

// Custom dialog function
function showCustomDialog(message, type = "success") {
  const dialog = document.getElementById("custom-dialog");
  const dialogMessage = document.getElementById("dialog-message");
  const dialogIcon = document.getElementById("dialog-icon");

  // Set icon and color based on type
  let icon = "";
  let color = "#ff004f";
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

  // Hide dialog after 1 second with smooth transition
  setTimeout(() => {
    dialog.classList.remove("show");
  }, 1000);
}

function submitSkill() {
  const skillName = document.getElementById("skill-name").value;
  const skillDetails = document.getElementById("skill-details").value;

  if (skillName && skillDetails) {
    // Send data to server
    fetch("/api/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillName: skillName,
        skillDetails: skillDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Skill sent to server successfully:", data.message);
          showCustomDialog("Skill sent to server successfully!", "success");
          document.getElementById("skill-name").value = "";
          document.getElementById("skill-details").value = "";
        } else {
          showCustomDialog("Error sending skill to server", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showCustomDialog("Failed to send skill to server", "error");
      });
  } else {
    showCustomDialog("Please fill in all fields", "warning");
  }
}

function submitExperience() {
  const expTitle = document.getElementById("experience-title").value;
  const expDetails = document.getElementById("experience-details").value;

  if (expTitle && expDetails) {
    fetch("/api/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        experienceTitle: expTitle,
        experienceDetails: expDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showCustomDialog(
            "Experience sent to server successfully!",
            "success"
          );
          document.getElementById("experience-title").value = "";
          document.getElementById("experience-details").value = "";
        } else {
          showCustomDialog("Error sending experience to server", "error");
        }
      })
      .catch((error) => {
        showCustomDialog("Failed to send experience to server", "error");
      });
  } else {
    showCustomDialog("Please fill in all fields", "warning");
  }
}

function submitEducation() {
  const eduYear = document.getElementById("education-year").value;
  const eduDetails = document.getElementById("education-details").value;

  if (eduYear && eduDetails) {
    fetch("/api/education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        educationYear: eduYear,
        educationDetails: eduDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showCustomDialog("Education sent to server successfully!", "success");
          document.getElementById("education-year").value = "";
          document.getElementById("education-details").value = "";
        } else {
          showCustomDialog("Error sending education to server", "error");
        }
      })
      .catch((error) => {
        showCustomDialog("Failed to send education to server", "error");
      });
  } else {
    showCustomDialog("Please fill in all fields", "warning");
  }
}
