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

// GET task by ID

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  res.json({
    status: "success",
    data: task,
  });
});



