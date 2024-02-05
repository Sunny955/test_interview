/*
CREATE TABLE Organization (
    ->     id INT PRIMARY KEY,
    ->     name VARCHAR(255) NOT NULL
    -> );

CREATE TABLE User (
    ->     id INT PRIMARY KEY,
    ->     name VARCHAR(255) NOT NULL,
    ->     organization_id INT,
    ->     FOREIGN KEY (organization_id) REFERENCES Organization(id)
    -> );

CREATE TABLE Data (
    ->     id INT PRIMARY KEY,
    ->     owner VARCHAR(255),
    ->     repository VARCHAR(255),
    ->     title VARCHAR(255),
    ->     reviewers VARCHAR(255),
    ->     status VARCHAR(50),
    ->     head_branch VARCHAR(255),
    ->     merge_date VARCHAR(255),
    ->     createdAt VARCHAR(255),
    ->     organization_id INT,
    ->     FOREIGN KEY (organization_id) REFERENCES Organization(id)
    -> );


Organization Table (foeign key) -> Data, User tables
*/

const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const secretKey = "secret";

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// JWT Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Authentication endpoint with JWT middleware
app.get("/authenticate", authenticateJWT, (req, res) => {
  const { username } = req.query;

  db.query(
    "SELECT id, organization_id FROM User WHERE name = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error querying user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        const { id: userId, organization_id: userOrganizationId } = results[0];

        if (userOrganizationId) {
          // Fetch data based on organization_id
          db.query(
            "SELECT * FROM Data WHERE organization_id = ?",
            [userOrganizationId],
            (err, data) => {
              if (err) {
                console.error("Error querying data:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              const result = {
                user_id: userId,
                data: data,
              };

              return res.json(result);
            }
          );
        } else {
          return res.json({
            error: "User does not belong to any organization",
          });
        }
      } else {
        return res.json({ error: "Invalid credentials" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username } = req.query;

  db.query(
    "SELECT id, organization_id FROM User WHERE name = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error querying user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        const user = {
          id: results[0].id,
          username: username,
        };

        const token = jwt.sign(user, secretKey);
        return res.json({ token: token });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
