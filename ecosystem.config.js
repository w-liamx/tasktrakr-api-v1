module.exports = {
  apps: [
    {
      name: "tasktrackr-api",
      script: "dist/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
