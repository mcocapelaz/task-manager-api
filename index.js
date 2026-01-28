const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage

let tasks = [];
let nextId = 1;

// GET all tasks

app.get("/api/tasks", (req, res) => {
  res.json({
    status: "success",
    data: tasks,
  });
});


