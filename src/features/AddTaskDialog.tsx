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

interface EditProps {
    value: string
    addTask: () => void
    onChange: (value: string) => void
    editInitialTaskName: (taskName: string) => void
}

export default function AddTaskDialog({ addTask, onChange, value, editInitialTaskName }: EditProps) {

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button onClick={() => editInitialTaskName("")}>Create Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add task</DialogTitle>
                        <DialogDescription>
                            Create your task here. Click Add when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="taskName">Task</Label>
                            <Input type="text" id="taskName" name="name" value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => addTask()}>Add</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}