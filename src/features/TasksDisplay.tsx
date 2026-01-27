import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaSyncAlt, FaTrash } from "react-icons/fa"
import TasksCard from "./TasksCard";
import { useEffect, useState } from "react";
import api from "@/api/GetApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import EmptyTasksCard from "./EmptyTasksCard";
import type { Task } from "@/types/ToDo";

export default function TasksDisplay() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleRefresh = () => {
        fetchToDoList()
    }

    const fetchToDoList = async () => {
        try {
            const response = await api.get("/", {
                params: { date }
            })
            if (date) {
                setDate(date)
            }
            if (response.data.length > 0) {
                setTasks(response.data[0].tasks)
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Failed to load tasks. Please try again.")
        }
    }

    useEffect(() => {
        fetchToDoList()
    }, [date])

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>{date}</CardTitle>
                    <div className="flex flex-row gap-2">
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
                        <CardAction>
                            <Button onClick={handleRefresh}><FaSyncAlt /></Button>
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
                            />
                        ))
                    )}
                    {tasks.length <= 0 && !errorMessage && (
                        <EmptyTasksCard />
                    )}
                    {errorMessage && (
                        <div className="flex flex-row items-center gap-2 text-red-500">
                            <AiOutlineExclamationCircle />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-row justify-center">
                    <Button><FaTrash /></Button>
                </CardFooter>
            </Card>
        </div>
    )
}