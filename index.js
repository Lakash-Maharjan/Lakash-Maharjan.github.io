const express = require("express");
const path = require("path");
const port = 3000;
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "Lakash",
  password: "Lakash@123",
  database: "dynamic_portfolio",
});

conn.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/api/skill", (req, res) => {
  const { skillName, skillDetails } = req.body;

  console.log("Received skill data:", { skillName, skillDetails });

  conn.query(
    "INSERT INTO skills (Skill, Description) VALUES (?, ?)",
    [skillName, skillDetails],
    (err, result) => {
      if (err) {
        console.log("Error inserting skill:", err);
        res.json({ success: false, message: "Error inserting skill" });
      } else {
        res.json({ success: true, message: "Skill inserted successfully" });
      }
    }
  );
});

app.post("/api/experience", (req, res) => {
  const { experienceTitle, experienceDetails } = req.body;
  console.log("Received experience data:", {
    experienceTitle,
    experienceDetails,
  });

  conn.query(
    "INSERT INTO experience (Experience, Detail) VALUES (?, ?)",
    [experienceTitle, experienceDetails],
    (err, result) => {
      if (err) {
        console.log("Error inserting experience:", err);
        res.json({ success: false, message: "Error inserting experience" });
      } else {
        res.json({
          success: true,
          message: "Experience inserted successfully",
        });
      }
    }
  );
});

app.post("/api/education", (req, res) => {
  const { educationYear, educationDetails } = req.body;
  console.log("Received education data:", { educationYear, educationDetails });

  conn.query(
    "INSERT INTO education (Year, Detail) VALUES (?, ?)",
    [educationYear, educationDetails],
    (err, result) => {
      if (err) {
        console.log("Error inserting education:", err);
        res.json({ success: false, message: "Error inserting education" });
      } else {
        res.json({ success: true, message: "Education inserted successfully" });
      }
    }
  );
});

app.get("/", (req, res) => {
  conn.query("SELECT * from skills", function (err, ski) {
    if (!err) {
      conn.query("SELECT * from education", function (err, edu) {
        if (!err) {
          conn.query("SELECT * from experience", function (err, exp) {
            if (!err) {
              return res.render("index", { ski, edu, exp });
            } else {
              console.log("Error while performing Query.");
            }
          });
        } else {
          console.log("Error while performing Query.");
        }
      });
    } else {
      console.log("Error while performing Query.");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
