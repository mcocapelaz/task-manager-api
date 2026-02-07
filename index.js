const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage with initial demo data

let tasks = [
  { id: "1", title: "Learn Node.js", completed: false },
  { id: "2", title: "Build a REST API", completed: true },
  { id: "3", title: "Write documentation", completed: true },
];

let nextId = 4;

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

app.post("/api/tasks", (req, res) => {
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
  const task = tasks.find((t) => t.id === req.params.id);

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

// DELETE task

app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.json({
    status: "success",
    message: "Task deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
