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

// POST create task

app.post("api/tasks", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "error",
      message: "Title is required",
    });
  }

  const newTask = {
    id: String(nextId++),
    title,
    completed,
  };

  tasks.push(newTask);

  res.status(201).json({
    status: "success",
    data: newTask,
  });
});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {
    const task = task.find((t) => t.id === req.params.id);
  
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }
  
    const { title, completed } = req.body;
  
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
  
    res.json({
      status: "success",
      data: task,
    });
  });

