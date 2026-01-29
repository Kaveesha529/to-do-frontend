import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaSyncAlt } from "react-icons/fa"
import TasksCard from "./TasksCard";
import { useEffect, useState } from "react";
import api from "@/api/GetApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import EmptyTasksCard from "./EmptyTasksCard";
import type { Task } from "@/types/ToDo";
import DeleteDialog from "./DeleteDialog";
import TaskSubmitForm from "./TaskSubmitForm";
import { toast } from "sonner";

interface TasksDisplayProps {
    isServerOnline: boolean
}

export default function TasksDisplay({ isServerOnline }: TasksDisplayProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null)
    const [toDoListId, setToDoListId] = useState<string>("")
    const [updatedTaskName, setUpdatedTaskName] = useState<string>("")

    //for refresh icon to refresh list
    const handleRefresh = () => {
        fetchToDoList()
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

    //to track editing name
    const handleTaskNameChange = (newTaskName: string) => {
        setUpdatedTaskName(newTaskName)
    }

    //to put current name as initial editing name in editing input box
    const handleInitialEditTaskName = (taskName: string) => {
        setUpdatedTaskName(taskName)
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

    //toggling status of a task
    const handleStatusToggle = (taskStatus: "pending" | "done", taskId: string) => {
        const newStatus = taskStatus === "pending" ? "done" : "pending"
        handleUpdateTaskStatus(taskId, newStatus)
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

    const handleFormErrorMessage = (formErrorMessage: string | null) => {
        setFormErrorMessage(formErrorMessage)
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
        <div className="flex flex-row w-full">
            <div className="flex-1 flex justify-center">
                <div className="w-2/3">
                    <TaskSubmitForm
                        addTask={(date) => addTask(date, updatedTaskName, true)}
                        onChange={handleTaskNameChange}
                        value={updatedTaskName}
                        setFormErrorMessage={handleFormErrorMessage}
                        formErrorMessage={formErrorMessage}
                    />
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="w-2/3">
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>{date}</CardTitle>
                                <div className="flex flex-row gap-2">
                                    <CardAction>
                                        <Button onClick={handleRefresh}><FaSyncAlt /></Button>
                                    </CardAction>
                                    <CardAction>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={date}
                                            onChange={(e) => {
                                                setDate(e.target.value)
                                                setTasks([])
                                                setErrorMessage("")
                                            }}
                                        />
                                    </CardAction>
                                </div>
                                <CardDescription>Tasks assigned for {date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {tasks.length > 0 && !errorMessage && (
                                    tasks.map(task => (
                                        <TasksCard
                                            key={task._id}
                                            task={task}
                                            deleteTask={() => handleDeleteTask(task._id)}
                                            editTask={() => handleUpdateTaskName(task._id)}
                                            onChange={handleTaskNameChange}
                                            value={updatedTaskName}
                                            editInitialTaskName={() => handleInitialEditTaskName(task.name)}
                                            toggleStatus={() => handleStatusToggle(task.status, task._id)}
                                        />
                                    ))
                                )}
                                {tasks.length <= 0 && !errorMessage && (
                                    <EmptyTasksCard
                                        addTask={() => addTask(new Date(date), updatedTaskName, false)}
                                        onChange={handleTaskNameChange}
                                        value={updatedTaskName}
                                        editInitialTaskName={() => handleInitialEditTaskName("")}
                                    />
                                )}
                                {errorMessage && (
                                    <div className="flex flex-row items-center gap-2 text-red-500">
                                        <AiOutlineExclamationCircle />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex flex-row justify-center">
                                {tasks.length > 0 && (
                                    <DeleteDialog handleDelete={handleDeleteList} />
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    )
}