import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { TaskItemData } from "./models/TaskItemData";
import { createTask } from "./statemanagement/Actions";
import './Task.css'
export const CreateTask = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState<TaskItemData>({
    id: uuid(),
    status: "started",
    title: "",
    description: "",
    priority: 1,
    dueDate: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setTask({ ...task, [name]: value })
    setErrors({ ...errors, [name]: "" })
  };

  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dueDate = event.target.value;
    setTask({ ...task, dueDate });

    const today = new Date().toISOString().slice(0, 10)
    setErrors({
      ...errors,
      dueDate: dueDate && dueDate < today ? "Due date must be from Today to future" : "",
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const validationErrors = validateTask(task);
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      dispatch(createTask(task));
      setTask({ ...task, id: uuid(), title: "", description: "", dueDate: '' })
    }
  }

  const validateTask = (task: TaskItemData): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (!task.title) errors.title = "Title is required."
    if (!task.description) errors.description = "Description is required."
    if (!task.dueDate) errors.dueDate = "Due date is required."
    if (task.priority < 1 || task.priority > 5) errors.priority = "Priority must be between 1 and 5."
    return errors;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-placeholder">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              aria-label="Title"
              placeholder="Task title"
              value={task.title}
              onChange={handleInputChange}
              className="input-value"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
        </div>    
        <div className="input-placeholder">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            aria-label="Description"
            placeholder="Task Description"
            value={task.description}          
            onChange={handleInputChange}
            className="input-value"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="input-placeholder">
          <label htmlFor="dueDate">Due Date:</label>        
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            aria-label="Due Date"
            placeholder="Due Date"
            value={task.dueDate}
            onChange={handleDueDateChange}
            className="input-value"
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </div>
        <div className="input-placeholder">
          <label htmlFor="priority">Priority:</label>
          <input
            type="number"
            id="priority"
            name="priority"
            aria-label="Priority"
            placeholder="Priority"
            value={task.priority}
            min={1}
            max={5}
            onChange={handleInputChange}
            className="input-value"
          />
        </div>
      </div>
      <div className="button-container">
        <button className="submit" type="submit">Create New Task</button>
      </div>        
    </form>    
    </>    
  )
}