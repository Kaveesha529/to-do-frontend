import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FaArrowLeft, FaArrowRight, FaSyncAlt } from "react-icons/fa"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { useToDo } from "@/contexts/ToDoContext"
import DeleteDialog from "./DeleteDialog"
import EmptyTasksCard from "./EmptyTasksCard"
import TasksCard from "./TasksCard"

export default function TasksDisplay() {

    const toDo = useToDo()

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
                                    const currentDate = new Date(toDo.date)
                                    currentDate.setDate(currentDate.getDate() - 1)
                                    toDo.handleDate(currentDate.toISOString().split("T")[0])
                                }}
                            >
                                <FaArrowLeft />
                            </Button>
                            {toDo.date}
                            <Button
                                variant={"outline"}
                                className="rounded-full w-8 h-8 items-center justify-center"
                                onClick={() => {
                                    const currentDate = new Date(toDo.date)
                                    currentDate.setDate(currentDate.getDate() + 1)
                                    toDo.handleDate(currentDate.toISOString().split("T")[0])
                                }}
                            >
                                <FaArrowRight />
                            </Button>
                        </div>
                    </CardTitle>
                    <div className="flex flex-row gap-2">
                        <CardAction>
                            <Button variant={"ghost"} onClick={toDo.handleRefresh} className="rounded-full w-10 h-10 items-center justify-center"><FaSyncAlt /></Button>
                        </CardAction>
                        <CardAction>
                            <Input
                                id="date"
                                type="date"
                                value={toDo.date}
                                onChange={(e) => {
                                    toDo.handleDate(e.target.value)
                                    toDo.handleTasks([])
                                    toDo.handleErrorMessage(null)
                                }}
                            />
                        </CardAction>
                    </div>
                    <CardDescription>Tasks assigned for {toDo.date}</CardDescription>
                </CardHeader>
                <CardContent>
                    {toDo.tasks.length > 0 && !toDo.errorMessage && (
                        toDo.tasks.map(task => (
                            <TasksCard
                                key={task._id}
                                task={task}
                            />
                        ))
                    )}
                    {toDo.tasks.length <= 0 && !toDo.errorMessage && (
                        <EmptyTasksCard />
                    )}
                    {toDo.errorMessage && (
                        <div className="flex flex-row items-center gap-2 text-red-500">
                            <AiOutlineExclamationCircle />
                            <span>{toDo.errorMessage}</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-row justify-center">
                    {toDo.tasks.length > 0 && (
                        <DeleteDialog />
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}