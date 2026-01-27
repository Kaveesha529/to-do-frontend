import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types/ToDo";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TaskCardProps {
    task: Task;
}

export default function TasksCard({ task }: TaskCardProps) {
    return (
        <div className="w-full my-2">
            <div className="flex flex-row gap-1">
                <Card className="py-3 w-3/4">
                    <CardContent>
                        <p>{task.name}</p>
                    </CardContent>
                </Card>
                <div className="flex flex-row w-1/4 items-center justify-end gap-2">
                    <Button><FaEdit /></Button>
                    <Button><FaTrash /></Button>
                </div>
            </div>
        </div>
    )
}