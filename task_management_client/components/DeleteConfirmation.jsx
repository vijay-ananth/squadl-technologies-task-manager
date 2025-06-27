import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteConfirmation = ({taskId, getAllTasks}) => {

    const handleDeleteTask = async() => {
        try {
            const deleteResponse = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
            console.log("deleteResponse", deleteResponse);
            const modalElement = document.getElementById('deleteModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement) ;
            modalInstance.hide();
            getAllTasks();
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error('Failed to delete task. Please try again.');
        }
      }

 

    return (
        <div>
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content rounded-4">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirm Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete?
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button class="btn btn-danger" onClick={handleDeleteTask}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation