import moment from 'moment';

const TaskCard = ({ handleGetDetails, handleDeleteCOnfirmationModal, handleUpdateStatus, allTask }) => {

    return (
        <div>
            {
                allTask.length > 0 ? allTask.map((task) => (
                    <div className="card border-danger mb-4" key={task.id}>
                        <div className="card-body bg-light">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="card-title">{task.title}</h5>
                                <div>
                                    {(() => {
                                        if (task?.priority?.toLowerCase() === "low") {
                                            return <span className="badge bg-warning text-dark rounded-pill">Low</span>;
                                        } else if (task?.priority?.toLowerCase() === "medium") {
                                            return <span className="badge bg-success rounded-pill">Medium</span>;
                                        } else if (task?.priority?.toLowerCase() === "high") {
                                            return <span className="badge bg-danger rounded-pill">High</span>;
                                        } else {
                                            return <span className="badge bg-secondary rounded-pill">Unknown</span>;
                                        }
                                    })()}
                                    {
                                        (() => {
                                            if (task.status === "pending") {
                                                return <span className="badge bg-primary rounded-pill">Pending</span>;
                                            } else if (task.status === "completed") {
                                                return <span className="badge bg-success rounded-pill">Completed</span>;
                                            } else {
                                                return <span className="badge bg-secondary rounded-pill">Unknown</span>;
                                            }
                                        })()
                                    }
                                    
                                </div>
                            </div>
                            <p className="card-text">{task.description}</p>
                            <p className="text-danger fw-semibold">{task.due_date ? `Due: ${moment(task.due_date).format('L')}`: ""}</p>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleGetDetails(task)}>Edit</button>
                                {   
                                 (()=>{
                                    if(task.status === "completed") {
                                          return <button className="btn btn-outline-info btn-sm" onClick={() => handleUpdateStatus('pending', task.id)}>Reopen</button>;
                                    } else {
                                        return <button className="btn btn-dark btn-sm" onClick={() => handleUpdateStatus('completed', task.id)}>Complete</button>;
                                    }
                                 })()
                                }
                                
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCOnfirmationModal(task.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )) : <p>No tasks found.</p>
            }




            {/* <div class="card border-secondary mb-4">
                <div class="card-body bg-white">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title text-decoration-line-through text-muted">Review code submissions</h5>
                        <div>
                            <span class="badge bg-warning text-dark rounded-pill">Medium</span>
                            <span class="badge bg-success rounded-pill">Completed</span>
                        </div>
                    </div>
                    <p class="card-text">
                        Review and approve pending code submissions from team members.
                    </p>
                    <p class="text-muted">Due: 10/01/2024</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-secondary btn-sm">View Details</button>
                        <button class="btn btn-outline-primary btn-sm">Edit</button>
                        <button class="btn btn-outline-info btn-sm">Reopen</button>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>


            <div class="card border-danger mb-4">
                <div class="card-body bg-light">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">Update user interface</h5>
                        <div>
                            <span class="badge bg-success rounded-pill">Low</span>
                            <span class="badge bg-primary rounded-pill">Pending</span>
                        </div>
                    </div>
                    <p class="card-text">
                        Implement new design changes to improve user experience.
                    </p>
                    <p class="text-danger fw-semibold">Due: 20/01/2024 (Overdue)</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-secondary btn-sm">View Details</button>
                        <button class="btn btn-outline-primary btn-sm">Edit</button>
                        <button class="btn btn-dark btn-sm">Complete</button>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default TaskCard