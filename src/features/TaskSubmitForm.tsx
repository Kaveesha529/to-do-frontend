import api from "@/api/GetApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function TaskSubmitForm() {
    const [date, setDate] = useState<string>("")
    const [taskName, setTaskName] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addTask(new Date(date), taskName)
    }

    const addTask = async (date: Date, taskName: string) => {
        try {
            await api.post("/create", {
                date,
                tasks: [{ name: taskName }]
            })
            setDate("")
            setTaskName("")
        } catch (error) {
            console.error("Error saving task: ", error)
            setErrorMessage("Failed to save task. Please try again.")
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add a task</CardTitle>
                <CardDescription>Fill below fields and click "Add" to add a task</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
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
                                    setErrorMessage("")
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
                                value={taskName}
                                onChange={(e) => {
                                    setTaskName(e.target.value)
                                    setErrorMessage("")
                                }}
                            />
                        </div>

                        {errorMessage && (
                            <div className="flex flex-row items-center gap-2 text-red-500">
                                <AiOutlineExclamationCircle />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>Add</Button>
            </CardFooter>
        </Card>
    )
}