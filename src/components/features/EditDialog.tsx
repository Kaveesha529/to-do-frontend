import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToDo } from "@/contexts/ToDoContext"
import type { Task } from "@/types/ToDo"
import { FaEdit } from "react-icons/fa"

interface EditProps {
    task: Task
}

export default function EditDialog({ task }: EditProps) {

    const toDo = useToDo()

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="rounded-full w-10 h-10 items-center justify-center"
                        variant={"secondary"}
                        onClick={() => toDo.handleInitialEditTaskName(task.name)}>
                        <FaEdit />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit task</DialogTitle>
                        <DialogDescription>
                            Make changes to your task here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="taskName">Task</Label>
                            <Input type="text" id="taskName" name="name" value={toDo.updatedTaskName}
                                onChange={(e) => toDo.handleTaskNameChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => toDo.handleUpdateTaskName(task._id)}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}