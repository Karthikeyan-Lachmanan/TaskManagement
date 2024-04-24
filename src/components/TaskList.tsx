import { useDispatch } from "react-redux";
import { TaskItemData } from "./models/TaskItemData"
import { deleteTask, editTask } from "./statemanagement/Actions";
import './Task.css'

export function TaskList(tasks: any) {
	const dispatch = useDispatch();
	const taskList = tasks.tasks

	return(
		<>
			{taskList.length > 0 ?  
				<table className="task-table">
					<thead>
						<tr >
							<th >Title</th>
							<th >Description</th>
							<th >DueDate</th>
							<th >Priority</th>
							<th >Status</th>
							<th >Action</th>
						</tr>
					</thead>
					<tbody >
					{tasks.tasks.map((task: TaskItemData) => (
						<tr key={task.id} >
							<td >{task.title}</td>
							<td >{task.description}</td>
							<td >{task.dueDate}</td>
							<td >{task.priority}</td>
							<td >{task.status}</td>
							<td >
									<div className="action">
											{task.status !== "completed" && (
											<button className="complete" onClick={() => dispatch(editTask(task.id))}>
												Complete
											</button>
											)}
											<button className="delete" onClick={() => dispatch(deleteTask(task.id))}>
												Delete
											</button>
									</div>
							</td>
						</tr>
					))}
					</tbody>
				</table> : <p className="no-task">No Tasks to Show. Create New Tasks</p>}
		</>             
	);
}