import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateAndUpdateTask = (
    { task, selectedDate, handleChange, setSelectedDate, handleSubmit, editModalOpen, handleUpdateTask}
) => {
    
    console.log("CreateAndUpdateTask", task);
  
    return (
        <div>
            <div class="modal fade" id="createTaskModal" tabindex="-1" aria-labelledby="createTaskModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content rounded-4">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createTaskModalLabel">{editModalOpen ? 'Edit Task' : 'Create New Task'}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div>
                            <div class="modal-body">

                                <div class="mb-3 text-start">
                                    <label for="taskTitle" class="form-label">Title<span className='text-danger'>*</span></label>
                                    <input type="text" class="form-control" id="title" value={task?.title} onChange={handleChange}/>
                                </div>


                                <div class="mb-3 text-start">
                                    <label for="taskDescription" class="form-label">Description <span className='text-danger'>*</span></label>
                                    <input class="form-control" id="description" value={task?.description} onChange={handleChange} />
                                </div>


                                <div class="mb-3 text-start">
                                    <label for="taskStatus" class="form-label">Status <span className='text-danger'>*</span></label>
                                    <select class="form-select" id="status" value={task?.status} onChange={handleChange}>
                                        <option value="Pending" selected>Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                <div class="mb-3 text-start">
                                    <label for="taskPriority" class="form-label">Priority <span className='text-danger'>*</span></label>
                                    <select class="form-select" id="priority" value={task?.priority} onChange={handleChange}>
                                        <option value="High">High</option>
                                        <option value="Medium" selected>Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>


                                <div class="mb-3 text-start" >
                                    <label for="taskDueDate" class="form-label">Date <span className='text-danger'>*</span></label>
                                     <div>
                                    <DatePicker
                                         selected={selectedDate ? selectedDate : new Date()}
                                         onChange={(date) => setSelectedDate(date)}
                                         placeholderText="Due Date"
                                         className="form-control"
                                    /> 
                                     </div>
                                                                  
                                </div>
                            </div>
                            <div class="modal-footer justify-content-between">
                                {editModalOpen 
                                    ? 
                                    <button type="submit" class="btn btn-dark" onClick={handleUpdateTask}>Update Task</button>
                                    :
                                    <button type="submit" class="btn btn-dark" onClick={handleSubmit}>Create Task</button>
                                }
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAndUpdateTask