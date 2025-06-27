import express from 'express';
import {
  createNewTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateTaskStatus
} from '../controllers/taskController.js'; // Add .js extension

const router = express.Router();

router.post('/', createNewTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);
router.put('/status/:id', updateTaskStatus);

export default router;
