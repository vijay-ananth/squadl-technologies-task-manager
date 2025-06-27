import express from 'express';
import cors from 'cors';
import './connection/db.js'; // Note the .js extension

import taskRoutes from './routes/task.js'; // Import routes

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
