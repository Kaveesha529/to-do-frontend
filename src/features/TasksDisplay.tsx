import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FaArrowLeft, FaArrowRight, FaSyncAlt } from "react-icons/fa"
import TasksCard from "./TasksCard"
import EmptyTasksCard from "./EmptyTasksCard"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import DeleteDialog from "./DeleteDialog"
import type { Task } from "@/types/ToDo"

interface TasksDisplayProps {
    date: string
    setDate: (date: string) => void
    handleRefresh: () => void
    setTasks: (tasks: Task[]) => void
    setErrorMessage: (errorMessage: string) => void
    tasks: Task[]
    errorMessage: string | null
    handleDeleteTask: (taskId: string) => void
    handleUpdateTaskName: (taskId: string) => void
    handleTaskNameChange: (taskName: string) => void
    updatedTaskName: string
    handleInitialEditTaskName: (taskId: string) => void
    handleStatusToggle: (taskStatus: "pending" | "done", taskId: string) => void
    addTask: (date: Date, taskName: string, form: boolean) => void
    handleDeleteList: () => void
}

export default function TasksDisplay({
    date,
    setDate,
    handleRefresh,
    setTasks,
    setErrorMessage,
    tasks,
    errorMessage,
    handleDeleteTask,
    handleUpdateTaskName,
    handleTaskNameChange,
    updatedTaskName,
    handleInitialEditTaskName,
    handleStatusToggle,
    addTask,
    handleDeleteList

}: TasksDisplayProps) {

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <Button
                                variant={"outline"}
                                className="rounded-full w-8 h-8 items-center justify-center"
                                onClick={() => {
                                    const currentDate = new Date(date)
                                    currentDate.setDate(currentDate.getDate() - 1)
                                    setDate(currentDate.toISOString().split("T")[0])
                                }}
                            >
                                <FaArrowLeft />
                            </Button>
                            {date}
                            <Button
                                variant={"outline"}
                                className="rounded-full w-8 h-8 items-center justify-center"
                                onClick={() => {
                                    const currentDate = new Date(date)
                                    currentDate.setDate(currentDate.getDate() + 1)
                                    setDate(currentDate.toISOString().split("T")[0])
                                }}
                            >
                                <FaArrowRight />
                            </Button>
                        </div>
                    </CardTitle>
                    <div className="flex flex-row gap-2">
                        <CardAction>
                            <Button variant={"ghost"} onClick={handleRefresh} className="rounded-full w-10 h-10 items-center justify-center"><FaSyncAlt /></Button>
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
                                handleTaskNameChange={(taskName) => handleTaskNameChange(taskName)}
                                taskName={updatedTaskName}
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
    )
}