import { Reducer } from "redux"
import { TaskItemData } from "../models/TaskItemData"
import { configureStore } from "@reduxjs/toolkit"
import { ActionTypes } from "./Actions"
import { SetStorage, AllStorage } from "./Storage"


const initalTaskDataItem: TaskItemData[] = AllStorage()

export const TaskReducer: Reducer<TaskItemData[]>= (state = initalTaskDataItem, action) => {
	switch(action.type) {
		case ActionTypes.createTask: {
			const newTask: TaskItemData = action.payload as TaskItemData
			if(SetStorage([...state, newTask])) console.log("value updated")
			return [...state, newTask]
		}
		case ActionTypes.deleteTask: {
			const id = action.payload
			const newState = state.filter((task) => task.id !== id)
			if(SetStorage(newState)) console.log("value deleted")
			return newState
		}

		case ActionTypes.editTask: {
			const id = action.payload
			const updatedState = state.map((task) => {
				if (task.id === id) {
				  return { ...task, status: 'completed' }
				} else {
				  return task
				}
			  });
			if(SetStorage(updatedState)) console.log("value updated")
			return updatedState
		}

		default:
			return state
	} 
}

const store = configureStore({
	reducer: {
		task: TaskReducer
	},
	})

export default store
