import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import TaskStore, { Task } from "../models/taskModel";

const taskStore = TaskStore.getInstance();

export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = taskStore.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch tasks", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = taskStore.getTaskById(id);
    
    if (!task) {
      res.status(404).json({ 
        success: false, 
        message: "Task not found" 
      });
      return;
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch task", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    const now = new Date().toISOString();
    const task: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    taskStore.addTask(task);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to create task", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updates: Partial<Task> = {};
    
    if (title !== undefined) {
      updates.title = title.trim();
    }
    
    if (description !== undefined) {
      updates.description = description.trim();
    }
    
    if (completed !== undefined) {
      updates.completed = completed;
    }
    
    updates.updatedAt = new Date().toISOString();
    
    const updatedTask = taskStore.updateTask(id, updates);
    
    if (!updatedTask) {
      res.status(404).json({ 
        success: false, 
        message: "Task not found" 
      });
      return;
    }

    res.json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to update task", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = taskStore.deleteTask(id);
    
    if (!deleted) {
      res.status(404).json({ 
        success: false, 
        message: "Task not found" 
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete task", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};
