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
const db = conn.promise();
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

// app.get("/", (req, res) => {
//   conn.query("SELECT * from skills", function (err, ski) {
//     if (!err) {
//       conn.query("SELECT * from education", function (err, edu) {
//         if (!err) {
//           conn.query("SELECT * from experience", function (err, exp) {
//             if (!err) {
//               return res.render("index", { ski, edu, exp });
//             } else {
//               console.log("Error while performing Query.");
//             }
//           });
//         } else {
//           console.log("Error while performing Query.");
//         }
//       });
//     } else {
//       console.log("Error while performing Query.");
//     }
//   });
// });

app.get("/", async (req, res) => {
  try {
    const [ski] = await db.execute("SELECT * from skills");
    const [edu] = await db.execute("SELECT * from education");
    const [exp] = await db.execute("SELECT * from experience");
    return res.render("index", { ski, edu, exp });
  } catch (err) {
    console.log("Error while performing Query.", err);
    return res.status(500).send("Database error");
  }
});

app.get("/form", async (req, res) => {
  try {
    const [ski] = await db.execute("SELECT * from skills");
    const [edu] = await db.execute("SELECT * from education");
    const [exp] = await db.execute("SELECT * from experience");
    return res.render("form", { ski, edu, exp });
  } catch (err) {
    console.log("Error while performing Query.", err);
    return res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/skill/:id", (req, res) => {
  const { name, description, id } = req.body;
  console.log("ID:", id);
  console.log("Name:", name);
  console.log("Description:", description);
  res.json({
    message: "Data received successfully",
    name,
    description,
  });
  conn.query(
    "UPDATE skills SET Skill = ?, Description = ? WHERE id = ?",
    [name, description, id],
    (err, result) => {
      if (!err) {
        console.log("Data inserted successfully");
      } else {
        console.log("Error while inserting data");
      }
    }
  );
});

app.post("/api/skill/:id/delete", (req, res) => {
  const { id } = req.body;
  console.log("ID:", id);
  res.json({
    message: "Data received successfully",
    id,
  });
  conn.query("DELETE FROM skills WHERE id = ?", [id], (err, result) => {
    if (!err) {
      console.log("Data deleted successfully");
    } else {
      console.log("Error while deleting data");
    }
  });
});
