import { TaskItemData } from "../models/TaskItemData"

export const SetStorage = (taskStorage: TaskItemData[]): boolean => {
    try {
      localStorage.setItem("Tasks", JSON.stringify(taskStorage));
      return true
    } catch (error) {
      console.error("Error storing tasks in localStorage:", error)
      return false    }
  }

export const AllStorage: () => TaskItemData[] | [] = () => {
    const existingData = localStorage.getItem("Tasks")
    const allData = existingData ? JSON.parse(existingData) : []
    return allData
}