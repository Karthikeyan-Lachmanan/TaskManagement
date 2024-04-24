import { useSelector } from "react-redux";
import { TaskItemData } from "./models/TaskItemData";
import { useState } from "react";
import './Task.css'
import { TaskList } from "./TaskList";

export const AllTasks = () => {
  const [priorityFilter, setPriorityFilter] = useState(false)
  const [titleFilter, setTitleFilter] = useState("")
  const [descriptionFilter, setDescriptionFilter] = useState("")
  const tasks = useSelector((store: any) => store.task)

  const filteredTasks = tasks.filter((task: TaskItemData) => {
    const matchesTitle = titleFilter === "" ||
      task.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesDescription = descriptionFilter === "" ||
      task.description.toLowerCase().includes(descriptionFilter.toLowerCase())    
    return matchesTitle && matchesDescription
  })
  const prioirtyFilteredTasks: TaskItemData[] = priorityFilter ? filteredTasks && filteredTasks.sort((a: TaskItemData, b: TaskItemData) => a.priority - b.priority) : filteredTasks
  
  return (
    <>
      <div className="filter-container">
        <div className="input-placeholder">
          <label htmlFor="filterByTitle">Search by Task Title:</label>
          <input
            placeholder="Search by Title"
            value={titleFilter}
            aria-label="Search By Title"
            onChange={(event) => setTitleFilter(event.target.value)}
            className="input-value"
          />
        </div>
        <div className="input-placeholder">
          <label htmlFor="filterByDescription">Search by Task Description:</label>
          <input
            placeholder="Search by Description"
            value={descriptionFilter}
            aria-label="Search By Description"
            onChange={(event) => setDescriptionFilter(event.target.value)}
            className="input-value"
          /> 
        </div>
        <div className="input-placeholder">
          <label htmlFor="filterByPriority">Filter By Priority:</label>
          <input
            type="checkbox"
            id="filterbypriority"
            aria-label="FilterBy Prioirty"
            onChange={() => setPriorityFilter(!priorityFilter)}
            checked={priorityFilter}
          />
        </div>
      </div>
      <TaskList tasks={prioirtyFilteredTasks}/> 
    </>
  );
}
