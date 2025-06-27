
---

## 🌐 Frontend Features

- ✅ Task List: View title, description, status, and due date
- 📝 Task Form: Create/edit tasks with form validation
- 🔍 Filters: Filter by task status (All / Pending / Completed)
- 📄 Task Details: View full task details and perform edit/delete
- 🔄 Global State: Managed using React Context API or Redux

---

## 🔧 Backend Features

### ✅ REST API Endpoints

| Method | Route               | Description             |
|--------|---------------------|-------------------------|
| POST   | `/api/tasks`        | Create new task         |
| GET    | `/api/tasks`        | Get all tasks (with optional filter) |
| GET    | `/api/tasks/:id`    | Get task by ID          |
| PUT    | `/api/tasks/:id`    | Update task             |
| DELETE | `/api/tasks/:id`    | Delete task             |

### 📊 MySQL Table Schema

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  due_date DATE,
  priority ENUM('High', 'Medium', 'Low') DEFAULT 'Low'
);
