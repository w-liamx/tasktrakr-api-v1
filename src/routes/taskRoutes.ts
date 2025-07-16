import { Router } from "express";
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from "../controllers/taskController";
import { validateTaskInput, validateTaskUpdate } from "../middleware/validation";

const router = Router();

// GET /api/v1/tasks - Get all tasks
router.get("/tasks", getTasks);

// GET /api/v1/tasks/:id - Get a specific task
router.get("/tasks/:id", getTaskById);

// POST /api/v1/tasks - Create a new task
router.post("/tasks", validateTaskInput, createTask);

// PUT /api/v1/tasks/:id - Update a task
router.put("/tasks/:id", validateTaskUpdate, updateTask);

// DELETE /api/v1/tasks/:id - Delete a task
router.delete("/tasks/:id", deleteTask);

export default router;
