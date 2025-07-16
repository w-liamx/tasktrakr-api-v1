# TaskTrackr API

A modern TypeScript Express.js REST API for task management with comprehensive CRUD operations and production-ready features.

## Features

- **Modern TypeScript**: Built with TypeScript using ES2020 features and strict type checking
- **Express.js 4.x**: Latest Express.js patterns and best practices
- **Security**: Helmet middleware for security headers and protection
- **Performance**: Compression middleware for response optimization
- **Validation**: Comprehensive input validation middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **CORS**: Configurable CORS support
- **Logging**: Morgan logging middleware with environment-specific formats
- **Health Check**: Built-in health check endpoint with environment info
- **Production Ready**: Graceful shutdown handling and production optimizations

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "environment": "development"
}
```

### Tasks

#### Get All Tasks
```
GET /api/v1/tasks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description",
      "completed": false,
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

#### Get Task by ID
```
GET /api/v1/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
}
```

#### Create Task
```
POST /api/v1/tasks
```

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description (optional)"
}
```

**Validation Rules:**
- `title`: Required, non-empty string, max 100 characters
- `description`: Optional string, max 500 characters

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
}
```

#### Update Task
```
PUT /api/v1/tasks/:id
```

**Request Body:**
```json
{
  "title": "Updated title (optional)",
  "description": "Updated description (optional)",
  "completed": true
}
```

**Validation Rules:**
- At least one field must be provided
- `title`: If provided, non-empty string, max 100 characters
- `description`: If provided, string, max 500 characters
- `completed`: If provided, boolean value

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:30:00.000Z"
  }
}
```

#### Delete Task
```
DELETE /api/v1/tasks/:id
```

**Response:**
```
204 No Content
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required and must be a non-empty string"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to create task",
  "error": "Error details"
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-tracker-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run clean` - Remove build artifacts
- `npm start` - Start production server
- `npm run lint` - Run TypeScript compiler check

### Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Express middleware (validation, error handling)
├── models/         # Data models and stores
├── routes/         # Route definitions
├── utils/          # Utility functions
├── app.ts          # Express app configuration
└── server.ts       # Server entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | CORS origin | `*` |

## Technology Stack

- **TypeScript**: Type-safe JavaScript with ES2020 features
- **Express.js**: Web framework with modern patterns
- **UUID**: Unique ID generation
- **Helmet**: Security middleware
- **Compression**: Response compression
- **Morgan**: HTTP request logging
- **CORS**: Cross-Origin Resource Sharing
- **Nodemon**: Development auto-reload

## Production Considerations

- Enable HTTPS in production
- Configure proper CORS origins
- Set up proper logging infrastructure
- Use a persistent database instead of in-memory storage
- Implement rate limiting
- Add authentication and authorization
- Set up monitoring and health checks
- Configure environment-specific settings

---

## Deploying to AWS EC2

### Prerequisites
- Node.js (v18+ recommended)
- npm
- (Recommended) PM2 process manager: `npm install -g pm2`

### Steps
1. **Clone the repository**
   ```bash
   git clone git@github.com:w-liamx/tasktrakr-api-v1.git
   cd tasktrakr-api-v1
   ```
2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```
3. **Install dependencies and build**
   ```bash
   npm install --production
   npm run build
   ```
4. **Start the server**
   - With Node.js:
     ```bash
     npm run start:prod
     ```
   - With PM2 (recommended for production):
     ```bash
     pm2 start ecosystem.config.js
     pm2 save
     pm2 startup
     ```
   - Or use the provided script:
     ```bash
     chmod +x start.sh
     ./start.sh
     ```

### Notes
- The server will run on the port specified in your `.env` file (default: 3000).
- For security, ensure your EC2 instance only exposes necessary ports (e.g., 3000 for HTTP, 22 for SSH).
- Use a reverse proxy (like Nginx) for SSL termination and load balancing in production.
- Use PM2 for automatic restarts and log management.
- Monitor your application and set up backups as needed.

---

## License

MIT
