# Backend Setup

This guide explains how to set up, configure, and run the backend of the application.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote)
- A terminal/command-line interface

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-backend-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   
   ### Sample `.env` File:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-secret-key
   ```

   - `PORT`: The port the server will run on (default: 5000).
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for JWT authentication.

4. Start MongoDB:
   - For local MongoDB: Ensure the MongoDB server is running (usually via `mongod`).

---

## Running the Server

1. start the production server:
   ```bash
   npm start
   ```

2. The backend server will be available at:
   ```
   http://localhost:<PORT>
   ```


## Troubleshooting
- **MongoDB Connection Issues**:
  - Verify your `MONGO_URI` in the `.env` file.
  - Ensure MongoDB is running.
- **Port in Use**:
  - Change the `PORT` in the `.env` file if the default port is already in use.

If further issues arise, check the logs or open an issue in the repository.

