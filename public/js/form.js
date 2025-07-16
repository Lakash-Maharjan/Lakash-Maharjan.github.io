// Form functionality for form.ejs

function showForm(category) {
  console.log("showForm called with:", category);
  document.getElementById("skills-form").classList.remove("active");
  document.getElementById("experience-form").classList.remove("active");
  document.getElementById("education-form").classList.remove("active");

  if (category === "skills") {
    document.getElementById("skills-form").classList.add("active");
  } else if (category === "experience") {
    document.getElementById("experience-form").classList.add("active");
  } else if (category === "education") {
    document.getElementById("education-form").classList.add("active");
  }
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
          setTimeout(function () {
            location.reload();
          }, 1500);
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

// Edit Skill Dialog
function editSkillDialog(id, skillName, skillDescription) {
  console.log("Edit button clicked:", id, skillName, skillDescription);
  let dialog = document.getElementById("edit-skill-dialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "edit-skill-dialog";
    dialog.className = "dialog-overlay show";
    dialog.innerHTML = `
      <div class="dialog-box">
        <div class="dialog-content">
          <h3 style="color:#ff004f;">Edit Skill</h3>
          <input id="edit-skill-name" type="text" value="" placeholder="Skill" style="margin-bottom:10px;width:100%;padding:8px;" />
          <textarea id="edit-skill-description" rows="4" placeholder="Description" style="width:100%;padding:8px;"></textarea>
          <div style="margin-top:18px;">
            <button class="btn btn-edit" onclick="saveSkillEdit(${id})">Save</button>
            <button class="btn" style="background:#333;" onclick="closeEditSkillDialog()">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  } else {
    dialog.classList.remove("hidden");
    dialog.classList.add("show");
  }
  document.getElementById("edit-skill-name").value = skillName;
  document.getElementById("edit-skill-description").value = skillDescription;
}
function closeEditSkillDialog() {
  const dialog = document.getElementById("edit-skill-dialog");
  if (dialog) {
    dialog.classList.remove("show");
    dialog.classList.add("hidden");
  }
}
function saveSkillEdit(id) {
  const name = document.getElementById("edit-skill-name").value;
  const description = document.getElementById("edit-skill-description").value;

  if (name && description) {
    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Description:", description);
    return fetch(`/api/skill/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showCustomDialog("Skill updated successfully", "success");
        closeEditSkillDialog();
        setTimeout(function () {
          location.reload();
        }, 1500);
      });
  } else {
    showCustomDialog("Please fill in both fields.", "error");
    console.error("Please fill in both fields.");
  }
}

function deleteSkill(id) {
  console.log("Delete button clicked:", id);
  return fetch(`/api/skill/${id}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      showCustomDialog("Skill deleted successfully", "success");
      setTimeout(function () {
        location.reload();
      }, 1500);
    });
}
