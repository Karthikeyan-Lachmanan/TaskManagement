import { createAction } from "@reduxjs/toolkit";
import { TaskItemData } from "../models/TaskItemData"

export enum ActionTypes {
    createTask = "CREATE_TASK",
    editTask = 'EDIT_TASK',
    deleteTask = 'DELETE_TASK'
}

type id = string | undefined

export const createTask = createAction<TaskItemData>(ActionTypes.createTask)
export const editTask = createAction<id>(ActionTypes.editTask)
export const deleteTask = createAction<id>(ActionTypes.deleteTask)