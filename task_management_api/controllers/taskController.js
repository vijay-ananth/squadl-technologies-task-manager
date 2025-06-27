
import db from '../connection/db.js'; // Import the database connection

// Create a new task
const createNewTask = async (req, res) => {
    console.log("createNewTask===>>>", req.body);
    try {
        const { title, description, status,  priority, dueDate} = req.body;
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [title, description, status, priority, dueDate]
        );
        console.log("result==>>>", result);
        res.status(201).json({ message: "Task created", taskId: result.insertId });
    } catch (error) {
        console.log("error===>>>", error);
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

// Get a task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, dueDate } = req.body;
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ?',
            [title, description, status, priority, dueDate, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log("updateTaskStatus===>>>", id, status);
        // Assuming you have a pool set up for database connection
        const [result] = await db.query(
            'UPDATE tasks SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task status updated" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task status", error });
    }
}

export {
    createNewTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    updateTaskStatus
};
