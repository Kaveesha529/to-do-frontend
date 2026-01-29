import { useEffect, useState } from "react";
import api from "@/api/GetApi";
import type { Task } from "@/types/ToDo";
import TaskSubmitForm from "./TaskSubmitForm";
import { toast } from "sonner";
import TasksDisplay from "./TasksDisplay";

interface TasksDisplayAndSubmissionProps {
    isServerOnline: boolean
}

export default function TasksDisplayAndSubmission({ isServerOnline }: TasksDisplayAndSubmissionProps) {

    const [toDoListId, setToDoListId] = useState<string>("")
    //to get todo list
    const fetchToDoList = async () => {
        try {
            const response = await api.get("/", {
                params: { date }
            })
            if (response.data.length > 0) {
                setTasks(response.data[0].tasks)
                setToDoListId(response.data[0]._id)
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
            const response = await api.delete(`/${toDoListId}`)
            toast.success(response.data.message)
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
            const response = await api.delete(`/${toDoListId}/tasks/${taskId}`)
            fetchToDoList()
            toast.success(response.data.message)
        } catch (error) {
            console.error("Error deleting task: ", error);
            setErrorMessage("Failed to delete task. Please try again.")
            toast.error("Task has not been deleted")
        }
    }


    //To update task name
    const handleUpdateTaskName = async (taskId: string) => {
        try {
            const response = await api.patch(`/${toDoListId}/tasks/${taskId}`, {
                name: updatedTaskName
            })
            fetchToDoList()
            setUpdatedTaskName("")
            toast.success(response.data.message)
        } catch (error) {
            console.error("Error editing task: ", error);
            setErrorMessage("Failed to editing task. Please try again.")
            toast.error("Task has not been updated")
        }
    }


    //To update a task status
    const handleUpdateTaskStatus = async (taskId: string, newStatus: "pending" | "done") => {
        try {
            await api.patch(`/${toDoListId}/tasks/${taskId}`, {
                status: newStatus
            })
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
            const response = await api.post("/create", {
                date,
                tasks: [{ name: taskName }]
            })
            setUpdatedTaskName("")
            fetchToDoList()
            toast.success(response.data.message)
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
    const handleErrorMessage = (newErrorMessage: string) => {
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


    useEffect(() => {
        fetchToDoList()
    }, [date, isServerOnline])

    useEffect(() => {
        if (!isServerOnline) {
            toast.error("Connection error")
        } else {
            toast.success("Back to online")
        }
    }, [isServerOnline])


    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex-1 flex justify-center">
                <div className="w-2/3 flex justify-center items-center">
                    <TaskSubmitForm
                        addTask={(date) => addTask(date, updatedTaskName, true)}
                        onChange={handleTaskNameChange}
                        value={updatedTaskName}
                        setFormErrorMessage={handleFormErrorMessage}
                        formErrorMessage={formErrorMessage}
                    />
                </div>
            </div>
            <div className="flex-1 flex justify-center relative">
                <div className="w-2/3 absolute top-30">
                    <TasksDisplay
                        date={date}
                        setDate={(date) => handleDate(date)}
                        handleRefresh={handleRefresh}
                        setTasks={(tasks) => handleTasks(tasks)}
                        setErrorMessage={(errorMessage) => handleErrorMessage(errorMessage)}
                        tasks={tasks}
                        errorMessage={errorMessage}
                        handleDeleteTask={(taskId) => handleDeleteTask(taskId)}
                        handleUpdateTaskName={(taskId) => handleUpdateTaskName(taskId)}
                        handleTaskNameChange={(taskName) => handleTaskNameChange(taskName)}
                        updatedTaskName={updatedTaskName}
                        handleInitialEditTaskName={(taskId) => handleInitialEditTaskName(taskId)}
                        handleStatusToggle={(taskStatus, taskId) => handleStatusToggle(taskStatus, taskId)}
                        addTask={() => addTask}
                        handleDeleteList={handleDeleteList}
                    />
                </div>
            </div>
        </div>

    )
}