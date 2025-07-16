import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`[TaskTrackr] Server started on port ${PORT}`);
  console.log(`[TaskTrackr] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[TaskTrackr] Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[TaskTrackr] SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('[TaskTrackr] Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[TaskTrackr] SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('[TaskTrackr] Process terminated');
    process.exit(0);
  });
});

export default server;
