import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToDo } from "@/contexts/ToDoContext";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function TaskSubmitForm() {

    const toDo = useToDo()

    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toDo.addTask(new Date(date), toDo.updatedTaskName, true)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add a task</CardTitle>
                <CardDescription>Fill below fields and click "Add" to add a task</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="taskSubmitForm" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                required
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                    toDo.handleFormErrorMessage(null)
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="task">Task</Label>
                            <Input
                                id="task"
                                type="text"
                                placeholder="Enter your task..."
                                required
                                value={toDo.updatedTaskName}
                                onChange={(e) => {
                                    toDo.handleTaskNameChange(e.target.value)
                                    toDo.handleFormErrorMessage(null)
                                }}
                            />
                        </div>

                        {toDo.formErrorMessage && (
                            <div className="flex flex-row items-center gap-2 text-red-500">
                                <AiOutlineExclamationCircle />
                                <span>{toDo.formErrorMessage}</span>
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" form="taskSubmitForm" className="w-full">Add</Button>
            </CardFooter>
        </Card>
    )
}