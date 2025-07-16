import { Request, Response, NextFunction } from "express";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateTaskInput = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description } = req.body;
  const errors: ValidationError[] = [];

  // Validate title
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push({ field: "title", message: "Title is required and must be a non-empty string" });
  } else if (title.trim().length > 100) {
    errors.push({ field: "title", message: "Title must be 100 characters or less" });
  }

  // Validate description (optional)
  if (description !== undefined && typeof description !== "string") {
    errors.push({ field: "description", message: "Description must be a string" });
  } else if (description && description.length > 500) {
    errors.push({ field: "description", message: "Description must be 500 characters or less" });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
    return;
  }

  next();
};

export const validateTaskUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, completed } = req.body;
  const errors: ValidationError[] = [];

  // At least one field must be provided for update
  if (title === undefined && description === undefined && completed === undefined) {
    errors.push({ 
      field: "body", 
      message: "At least one field (title, description, or completed) must be provided for update" 
    });
  }

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      errors.push({ field: "title", message: "Title must be a non-empty string" });
    } else if (title.trim().length > 100) {
      errors.push({ field: "title", message: "Title must be 100 characters or less" });
    }
  }

  // Validate description if provided
  if (description !== undefined && typeof description !== "string") {
    errors.push({ field: "description", message: "Description must be a string" });
  } else if (description && description.length > 500) {
    errors.push({ field: "description", message: "Description must be 500 characters or less" });
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push({ field: "completed", message: "Completed must be a boolean" });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
    return;
  }

  next();
};
