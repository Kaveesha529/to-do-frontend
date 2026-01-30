import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types/ToDo";
import { FaCheck, FaTrash } from "react-icons/fa";
import EditDialog from "./EditDialog";
import { useToDo } from "@/contexts/ToDoContext";

interface TaskCardProps {
    task: Task
}

export default function TasksCard({ task }: TaskCardProps) {

    const toDo = useToDo()

    return (
        <div className="w-full my-2">
            <div className="flex flex-row gap-3">
                <div className="flex flex-row items-center">
                    {task.status === "pending" ?
                        <Button className="w-10 h-10 items-center justify-center"
                            variant={"outline"}
                            onClick={() => toDo.handleStatusToggle(task.status, task._id)}>

                        </Button> :
                        <Button className="w-10 h-10 items-center justify-center"
                            onClick={() => toDo.handleStatusToggle(task.status, task._id)}>
                            <FaCheck />
                        </Button>
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
                        task={task}
                    />
                    <Button className="rounded-full w-10 h-10 items-center justify-center"
                        variant={"secondary"}
                        onClick={() => toDo.handleDeleteTask(task._id)}>
                        <FaTrash />
                    </Button>
                </div>
            </div>
        </div>
    )
}