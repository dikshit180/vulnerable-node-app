const express = require("express");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const app = express();
const PORT = 3000;

// Vulnerable route with prototype pollution
app.get("/pollute", (req, res) => {
  const payload = { user: "test" };
  _.set(payload, "__proto__.admin", true); // Prototype pollution
  res.json(payload);
});

// Weak secret in JWT
const SECRET_KEY = "123"; // Hardcoded weak key
app.get("/token", (req, res) => {
  const token = jwt.sign({ user: "test" }, SECRET_KEY);
  res.json({ token });
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));