import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskCard from '../components/TaskCard'
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmation from '../components/DeleteConfirmation'
import CreateAndUpdateTask from '../components/CreateAndUpdateTask'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const [task, setTask] = useState({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium"
    });

    console.log("setTasksetTasksetTask", task);
  
    const [selectedDate, setSelectedDate] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [allTask, setAllTask] = useState([]);

    console.log("selectedDate===>>>", selectedDate);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setTask((prev) => ({ ...prev, [id]: value }));
    };

    const getAllTasks = async () => {
      try {
          const response = await axios.get("http://localhost:5000/api/tasks/");
          setAllTask(response?.data?.length > 0 ? response.data : []);
      } catch (error) {
          console.error("Error fetching tasks:", error);
      }
    }

    useEffect(() => {
      getAllTasks();
    }, []);
  
    const handleSubmit = async()=>{
      try {
      
          if(!task?.title || !task?.description || !selectedDate){
              toast.error("Please fill all the required fields.");
          } else{
              let requestData = {
                  title: task.title,
                  description: task.description,
                  status: task.status,
                  priority: task.priority,
                  dueDate: selectedDate.toISOString().split('T')[0] 
              };
              console.log("requestData===>>>", requestData);
              const createTaskRes = await axios.post("http://localhost:5000/api/tasks/", 
                  requestData
              )
              const modalElement = document.getElementById('createTaskModal');
              const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement) ;
              modalInstance.hide();
              getAllTasks()
              console.log("createTaskRes", createTaskRes);
          }
      } catch (error) {
          console.log("error===>>>>", error);
      }
    }
  
       const handleGetDetails = async(task) => {
          try {
            setEditModalOpen(true);
              setTask({
                  title: task.title,
                  description: task.description,
                  status: task?.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : "Pending",
                  priority: task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "Medium",
              });
                setSelectedDate(task.due_date ? new Date(task.due_date) : null);
             
                setTaskId(task?.id);
                const modalElement = document.getElementById('createTaskModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement) ;
                modalInstance.show();
          } catch (error) {
              console.error("Error fetching task details:", error);
          }
      }

      const handleUpdateTask = async() => {
        try {
          console.log("!task?.title || !task?.description || !selectedDate", !task?.title , !task?.description , !selectedDate);
            if(!task?.title || !task?.description || !selectedDate){
                toast.error("Please fill all the required fields.");
            } else{
                let requestData = {
                    title: task?.title,
                    description: task.description,
                    status: task.status.toLowerCase(),
                    priority: task.priority?.toLowerCase(),
                    dueDate: selectedDate.toISOString().split('T')[0]
                };
              
                const updateTaskRes = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, 
                    requestData
                );
                console.log("updateTaskRes", updateTaskRes);
                toast.success('Task updated successfully!');
                setEditModalOpen(false);
                setTask({
                    title: "",
                    description: "",
                    status: "Pending",
                    priority: "Medium",
                });
                setSelectedDate(null);
                const modalElement = document.getElementById('createTaskModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement) ;
                modalInstance.hide();
                getAllTasks();
                setTaskId(null);
            }
        } catch (error) {
            console.log("error===>>>>", error);
            toast.error('Failed to update task. Please try again.');
        }
      }
      
      const handleDeleteCOnfirmationModal = (id) => {
        setTaskId(id);
        const modalElement = document.getElementById('deleteModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
      }

      const handleOpenCreateTaskModal = () => {
        setEditModalOpen(false);
        setTask({
          title: "",
          description: "",
          status: "Pending",
          priority: "Medium",
        });
        setSelectedDate(null);
        const modalElement = document.getElementById('createTaskModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
      
     const handleUpdateStatus = async(status, taskId) => {
        try {
          console.log("status, taskId", status, taskId);
            const updateStatusRes = await axios.put(`http://localhost:5000/api/tasks/status/${taskId}`, {
                status: status
            });
            console.log("updateStatusRes", updateStatusRes);
            getAllTasks();
            toast.success(`Task marked as ${status} successfully!`);
            
      
        } catch (error) {
            console.error("Error updating task status:", error);
            toast.error('Failed to update task status. Please try again.');
        }
    }

    const handleFilterTask = (e) => {
      const filterValue = e.target.value;
      console.log("filterValue", filterValue);
      if (filterValue === "All Tasks") {
        getAllTasks();
      } else {
        const filteredTasks = allTask.filter(task => task.status.toLowerCase() === filterValue.toLowerCase());
        setAllTask(filteredTasks);
      }
    }

    const handleFilterPriority = (e) => {
      const filterValue = e.target.value;
      console.log("filterValue", filterValue);
      if (filterValue === "All Priorities") {
        getAllTasks();
      } else {
        const filteredTasks = allTask.filter(task => task.priority.toLowerCase() === filterValue.toLowerCase());
        setAllTask(filteredTasks);
      }
    }
      

  return (
    <>
    <ToastContainer />
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Task Management</h2>
        
          <button class="btn btn-dark" type="button" onClick={handleOpenCreateTaskModal} data-bs-toggle="modal" data-bs-target="#createTaskModal">+ Create New Task</button>
        </div>

        <div class="card p-4 mb-4">
          <h5>Filters & Search</h5>
          <div class="row g-3">
            
            <div class="col-md-4">
              <select class="form-select" onClick={handleFilterTask}>
                <option>All Tasks</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
            <div class="col-md-4">
              <select class="form-select" onClick={handleFilterPriority}>
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <p>{`Showing ${allTask.length} task`}</p>

        <TaskCard 
          handleGetDetails = {handleGetDetails}
          handleDeleteCOnfirmationModal= {handleDeleteCOnfirmationModal}
          handleUpdateStatus = {handleUpdateStatus}
          allTask = {allTask}
        />
        <CreateAndUpdateTask 
          task = {task}
          selectedDate = {selectedDate}
          handleChange = {handleChange}
          setSelectedDate = {setSelectedDate}
          handleSubmit = {handleSubmit}
          editModalOpen = {editModalOpen}
          handleUpdateTask = {handleUpdateTask}
         
        />
        <DeleteConfirmation
        taskId={taskId} 
        getAllTasks={getAllTasks}/>

      </div>

    </>
  )
}

export default App
