import type { Task } from "@/types/ToDo"
import { useState } from "react"
import { toast } from "sonner"
import * as toDoApi  from "@/api/ToDoApi"
export function useToDoList() {
    const [toDoListId, setToDoListId] = useState<string>("")
    //to get todo list
    const fetchToDoList = async () => {
        try {
            const data = await toDoApi.getToDoList(date)
            if (data.length > 0) {
                setTasks(data[0].tasks)
                setToDoListId(data[0]._id)
                setErrorMessage(null)
            } else {
                setTasks([])
                setToDoListId("")
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Failed to load tasks. Please try again.")
        }
    }


    //for delete a full list
    const handleDeleteList = async () => {
        try {
            const data = await toDoApi.deleteList(toDoListId)
            toast.success(data.message)
            fetchToDoList()
        } catch (error) {
            console.error("Error deleting list: ", error);
            setErrorMessage("Failed to delete list. Please try again.")
            toast.error("List has not been deleted")
        }
    }


    //for delete a single task
    const handleDeleteTask = async (taskId: string) => {
        try {
            const data = await toDoApi.deleteTask(toDoListId, taskId)
            fetchToDoList()
            toast.success(data.message)
        } catch (error) {
            console.error("Error deleting task: ", error);
            setErrorMessage("Failed to delete task. Please try again.")
            toast.error("Task has not been deleted")
        }
    }


    //To update task name
    const handleUpdateTaskName = async (taskId: string) => {
        try {
            const data = await toDoApi.updateTaskName(toDoListId, taskId, updatedTaskName)
            fetchToDoList()
            setUpdatedTaskName("")
            toast.success(data.message)
        } catch (error) {
            console.error("Error editing task: ", error);
            setErrorMessage("Failed to editing task. Please try again.")
            toast.error("Task has not been updated")
        }
    }


    //To update a task status
    const handleUpdateTaskStatus = async (taskId: string, newStatus: "pending" | "done") => {
        try {
            await toDoApi.updateTaskStatus(toDoListId, taskId, newStatus)
            fetchToDoList()
        } catch (error) {
            console.error("Error updating task status: ", error);
            setErrorMessage("Failed to update task status. Please try again.")
        }
    }
    //toggling status of a task
    const handleStatusToggle = (taskStatus: "pending" | "done", taskId: string) => {
        const newStatus = taskStatus === "pending" ? "done" : "pending"
        handleUpdateTaskStatus(taskId, newStatus)
    }


    //to add a task in empty tasklist/ task submission form
    const addTask = async (date: Date, taskName: string, form: boolean) => {
        try {
            const data = await toDoApi.createTask(date, taskName)
            setUpdatedTaskName("")
            fetchToDoList()
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving task: ", error)
            if (form) {
                setFormErrorMessage("Failed to save task. Please try again.")
            } else {
                setErrorMessage("Failed to save task. Please try again.")
            }

            toast.error("Task has not been created")
        }
    }


    const [tasks, setTasks] = useState<Task[]>([])
    //to set Tasks
    const handleTasks = (newTasks: Task[]) => {
        setTasks(newTasks)
    }


    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
    //to set date in tasks card
    const handleDate = (newDate: string) => {
        setDate(newDate)
    }


    const [updatedTaskName, setUpdatedTaskName] = useState<string>("")
    //to track editing name
    const handleTaskNameChange = (newTaskName: string) => {
        setUpdatedTaskName(newTaskName)
    }
    //to put current name as initial editing name in editing input box
    const handleInitialEditTaskName = (taskName: string) => {
        setUpdatedTaskName(taskName)
    }


    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    //to set error message
    const handleErrorMessage = (newErrorMessage: string | null) => {
        setErrorMessage(newErrorMessage)
    }


    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null)
    //to set Form error message
    const handleFormErrorMessage = (formErrorMessage: string | null) => {
        setFormErrorMessage(formErrorMessage)
    }


    //for refresh icon to refresh list
    const handleRefresh = () => {
        fetchToDoList()
    }

    return {
    tasks,
    date,
    updatedTaskName,
    errorMessage,
    formErrorMessage,
    fetchToDoList,
    addTask,
    handleDeleteList,
    handleDeleteTask,
    handleUpdateTaskName,
    handleStatusToggle,
    handleRefresh,
    handleErrorMessage,
    handleFormErrorMessage,
    handleInitialEditTaskName,
    handleTaskNameChange,
    handleDate,
    handleTasks
    }
}