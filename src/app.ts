import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { notFound, errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.disable("x-powered-by");

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// API routes
app.use("/api/v1", taskRoutes);

// Catch-all for undefined routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export default app;
