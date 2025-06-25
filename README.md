# Task Management Portal

> **Note:** Make sure you have a `public/index.html` file in your frontend directory. This file is required for the React app to run.

This project is a full-stack Task Management Portal integrated with AI agents. It consists of a frontend built with React.js and a backend powered by Node.js and Express.js. The application allows users to manage tasks efficiently while leveraging AI for task optimization and insights.

## Frontend

The frontend is developed using React.js and includes the following features:

- **Task List**: View all tasks with details.
- **Task Form**: Create and update tasks with validation.
- **AI Agent Panel**: Get suggestions and insights from AI agents.
- **Dashboard**: Overview of tasks categorized by status (pending, ongoing, completed).

### Setup Instructions

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Backend

The backend is built with Node.js and Express.js, providing a RESTful API for task management. Key components include:

- **Task Controller**: Handles CRUD operations for tasks.
- **Task Routes**: Defines API endpoints for task management.
- **Task Model**: Represents the task schema in the database.
- **AI Agent Service**: Interacts with AI services for task optimization.

### Setup Instructions

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   node src/app.js
   ```

## Features

- User-friendly interface for task management.
- AI-driven insights for better task allocation and management.
- Responsive design for accessibility on various devices.

## Security & Secret Management

- **All secrets and sensitive configuration (API keys, etc.) must be stored in a `.env` file.**
- **Never commit `.env` or any secret files to version control.**
- See [../backend/SECURITY.md](../backend/SECURITY.md) for best practices.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.