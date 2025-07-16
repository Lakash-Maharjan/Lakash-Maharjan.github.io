// Form functionality for form.ejs

function showForm(category) {
  console.log("showForm called with:", category);
  document.getElementById("skills-form").classList.remove("active");
  document.getElementById("experience-form").classList.remove("active");
  document.getElementById("education-form").classList.remove("active");
  document.getElementById("services-form").classList.remove("active");

  if (category === "skills") {
    document.getElementById("skills-form").classList.add("active");
  } else if (category === "experience") {
    document.getElementById("experience-form").classList.add("active");
  } else if (category === "education") {
    document.getElementById("education-form").classList.add("active");
  } else if (category === "services") {
    document.getElementById("services-form").classList.add("active");
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
          }, 1000);
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
          setTimeout(function () {
            location.reload();
          }, 1000);
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
          setTimeout(function () {
            location.reload();
          }, 1000);
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

function submitService() {
  const serviceTitle = document.getElementById("service-title").value;
  const serviceDescription = document.getElementById(
    "service-description"
  ).value;
  const serviceSymbol = document.getElementById("service-symbol").value;

  if (serviceTitle && serviceDescription && serviceSymbol) {
    fetch("/api/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceTitle: serviceTitle,
        serviceDescription: serviceDescription,
        serviceSymbol: serviceSymbol,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          showCustomDialog("Service sent to server successfully!", "success");
          document.getElementById("service-title").value = "";
          document.getElementById("service-description").value = "";
          document.getElementById("service-symbol").value = "";
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          showCustomDialog("Error sending service to server", "error");
        }
      })
      .catch((error) => {
        showCustomDialog("Failed to send service to server", "error");
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
        }, 1000);
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
      }, 1000);
    });
}

// Edit Experience Dialog
function editExperienceDialog(id, experienceTitle, experienceDetail) {
  console.log("Edit button clicked:", id, experienceTitle, experienceDetail);
  let dialog = document.getElementById("edit-experience-dialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "edit-experience-dialog";
    dialog.className = "dialog-overlay show";
    dialog.innerHTML = `
      <div class="dialog-box">
        <div class="dialog-content">
          <h3 style="color:#ff004f;">Edit Experience</h3>
          <input id="edit-experience-title" type="text" value="" placeholder="Experience" style="margin-bottom:10px;width:100%;padding:8px;" />
          <textarea id="edit-experience-detail" rows="4" placeholder="Detail" style="width:100%;padding:8px;"></textarea>
          <div style="margin-top:18px;">
            <button class="btn btn-edit" onclick="saveExperienceEdit(${id})">Save</button>
            <button class="btn" style="background:#333;" onclick="closeEditExperienceDialog()">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  } else {
    dialog.classList.remove("hidden");
    dialog.classList.add("show");
  }
  document.getElementById("edit-experience-title").value = experienceTitle;
  document.getElementById("edit-experience-detail").value = experienceDetail;
}
function closeEditExperienceDialog() {
  const dialog = document.getElementById("edit-experience-dialog");
  if (dialog) {
    dialog.classList.remove("show");
    dialog.classList.add("hidden");
  }
}
function saveExperienceEdit(id) {
  const title = document.getElementById("edit-experience-title").value;
  const detail = document.getElementById("edit-experience-detail").value;

  if (title && detail) {
    console.log("ID:", id);
    console.log("Title:", title);
    console.log("Detail:", detail);
    return fetch(`/api/experience/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, detail, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showCustomDialog("Experience updated successfully", "success");
        closeEditExperienceDialog();
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
  } else {
    showCustomDialog("Please fill in both fields.", "error");
    console.error("Please fill in both fields.");
  }
}

function deleteExperience(id) {
  console.log("Delete button clicked:", id);
  return fetch(`/api/experience/${id}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      showCustomDialog("Experience deleted successfully", "success");
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
}

// Edit Education Dialog
function editEducationDialog(id, educationYear, educationDetail) {
  console.log("Edit button clicked:", id, educationYear, educationDetail);
  let dialog = document.getElementById("edit-education-dialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "edit-education-dialog";
    dialog.className = "dialog-overlay show";
    dialog.innerHTML = `
      <div class="dialog-box">
        <div class="dialog-content">
          <h3 style="color:#ff004f;">Edit Education</h3>
          <input id="edit-education-year" type="text" value="" placeholder="Year" style="margin-bottom:10px;width:100%;padding:8px;" />
          <textarea id="edit-education-detail" rows="4" placeholder="Detail" style="width:100%;padding:8px;"></textarea>
          <div style="margin-top:18px;">
            <button class="btn btn-edit" onclick="saveEducationEdit(${id})">Save</button>
            <button class="btn" style="background:#333;" onclick="closeEditEducationDialog()">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  } else {
    dialog.classList.remove("hidden");
    dialog.classList.add("show");
  }
  document.getElementById("edit-education-year").value = educationYear;
  document.getElementById("edit-education-detail").value = educationDetail;
}
function closeEditEducationDialog() {
  const dialog = document.getElementById("edit-education-dialog");
  if (dialog) {
    dialog.classList.remove("show");
    dialog.classList.add("hidden");
  }
}
function saveEducationEdit(id) {
  const year = document.getElementById("edit-education-year").value;
  const detail = document.getElementById("edit-education-detail").value;

  if (year && detail) {
    console.log("ID:", id);
    console.log("Year:", year);
    console.log("Detail:", detail);
    return fetch(`/api/education/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year, detail, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showCustomDialog("Education updated successfully", "success");
        closeEditEducationDialog();
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
  } else {
    showCustomDialog("Please fill in both fields.", "error");
    console.error("Please fill in both fields.");
  }
}

function deleteEducation(id) {
  console.log("Delete button clicked:", id);
  return fetch(`/api/education/${id}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      showCustomDialog("Education deleted successfully", "success");
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
}

//Edit Service Dialog
function editServiceDialog(
  id,
  serviceSymbol,
  serviceTitle,
  serviceDescription
) {
  console.log(
    "Edit button clicked:",
    id,
    serviceSymbol,
    serviceTitle,
    serviceDescription
  );
  let dialog = document.getElementById("edit-service-dialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "edit-service-dialog";
    dialog.className = "dialog-overlay show";
    dialog.innerHTML = `
      <div class="dialog-box">
        <div class="dialog-content">
          <h3 style="color:#ff004f;">Edit Service</h3>
          <input id="edit-service-symbol" type="text" value="" placeholder="Symbol (only class name)" style="margin-bottom:10px;width:100%;padding:8px;" />
          <input id="edit-service-title" type="text" value="" placeholder="Service" style="margin-bottom:10px;width:100%;padding:8px;" />
          <textarea id="edit-service-description" rows="4" placeholder="Description" style="width:100%;padding:8px;"></textarea>
          <div style="margin-top:18px;">
            <button class="btn btn-edit" onclick="saveServiceEdit(${id})">Save</button>
            <button class="btn" style="background:#333;" onclick="closeEditServiceDialog()">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  } else {
    dialog.classList.remove("hidden");
    dialog.classList.add("show");
  }
  document.getElementById("edit-service-symbol").value = serviceSymbol;
  document.getElementById("edit-service-title").value = serviceTitle;
  document.getElementById("edit-service-description").value =
    serviceDescription;
}

function closeEditServiceDialog() {
  const dialog = document.getElementById("edit-service-dialog");
  if (dialog) {
    dialog.classList.remove("show");
    dialog.classList.add("hidden");
  }
}

function saveServiceEdit(id) {
  const symbol = document.getElementById("edit-service-symbol").value;
  const title = document.getElementById("edit-service-title").value;
  const description = document.getElementById("edit-service-description").value;

  if (title && description) {
    console.log("ID:", id);
    console.log("Symbol:", symbol);
    console.log("Title:", title);
    console.log("Description:", description);
    return fetch(`/api/service/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol, title, description, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showCustomDialog("Service updated successfully", "success");
        closeEditServiceDialog();
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
  } else {
    showCustomDialog("Please fill in both fields.", "error");
    console.error("Please fill in both fields.");
  }
}

function deleteService(id) {
  console.log("Delete button clicked:", id);
  return fetch(`/api/service/${id}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      showCustomDialog("Service deleted successfully", "success");
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
}
