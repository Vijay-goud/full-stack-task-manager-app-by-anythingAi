import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../../api";

function Dashboard({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = useCallback(async () => {
    const data = await getTasks(token);
    if (Array.isArray(data)) setTasks(data);
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateTask(token, editingId, form);
    } else {
      await createTask(token, form);
    }

    setForm({ title: "", description: "" });
    setEditingId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    await deleteTask(token, id);
    fetchTasks();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update Task" : "Add Task"}</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && (
          <p className="empty-text">No tasks yet. Add one ✨</p>
        )}

        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>

            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
