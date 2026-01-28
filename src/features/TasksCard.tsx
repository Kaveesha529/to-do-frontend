import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types/ToDo";
import { FaCheck, FaTrash } from "react-icons/fa";
import EditDialog from "./EditDialog";

interface TaskCardProps {
    task: Task
    deleteTask: (taskId: string) => void
    editTask: (taskId: string) => void
    value: string
    onChange: (value: string) => void
    editInitialTaskName: (taskName: string) => void
    toggleStatus: (taskStatus: "pending" | "done", taskId: string) => void
}

export default function TasksCard({ task, deleteTask, editTask, onChange, value, editInitialTaskName, toggleStatus }: TaskCardProps) {
    return (
        <div className="w-full my-2">
            <div className="flex flex-row gap-3">
                <div className="flex flex-row items-center">
                    {task.status === "pending" ?
                        <Button variant={"outline"} onClick={() => toggleStatus(task.status, task._id)}></Button> :
                        <Button onClick={() => toggleStatus(task.status, task._id)}><FaCheck /></Button>
                    }
                </div>
                <Card className="py-3 w-3/4">
                    <CardContent>
                        {task.status === "pending" ?
                            (<p >{task.name}</p>) :
                            (<p className="line-through">{task.name}</p>)}
                    </CardContent>
                </Card>
                <div className="flex flex-row w-1/4 items-center justify-end gap-2">
                    <EditDialog
                        editTask={() => editTask(task._id)}
                        task={task}
                        onChange={onChange}
                        value={value}
                        editInitialTaskName={() => editInitialTaskName(task.name)}
                    />
                    <Button onClick={() => deleteTask(task._id)}><FaTrash /></Button>
                </div>
            </div>
        </div>
    )
}