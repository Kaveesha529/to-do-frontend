import { useEffect, useRef } from "react";
import TaskSubmitForm from "../components/features/TaskSubmitForm";
import { toast } from "sonner";
import { useToDo } from "@/contexts/ToDoContext";
import TasksDisplay from "@/components/features/TasksDisplay";

interface TasksDisplayAndSubmissionProps {
    isServerOnline: boolean
    isOnline: boolean
    wasServerOffline: ReturnType<typeof useRef<boolean>>
    wasOffline: ReturnType<typeof useRef<boolean>>
}

export default function TasksDisplayAndSubmission({ isServerOnline, isOnline, wasServerOffline, wasOffline }: TasksDisplayAndSubmissionProps) {

    const toDo = useToDo()

    useEffect(() => {
        toDo.fetchToDoList()
    }, [toDo.date, isServerOnline, isOnline])

    useEffect(() => {
        if (!isOnline) return

        if (!isServerOnline && !wasServerOffline.current) {
            wasServerOffline.current = true
            toast.error("Server unavailable")
        } else if (isServerOnline && wasServerOffline.current) {
            wasServerOffline.current = false
            toast.success("Server connected")
        }
    }, [isServerOnline, isOnline])

    useEffect(() => {
        if (!isOnline && !wasOffline.current) {
            wasOffline.current = true
            toast.error("No internet connection")
            toDo.handleErrorMessage("Internet connection has been lost")
        } else if (isOnline && wasOffline.current) {
            wasOffline.current = false
            toast.success("Back to Online")
            toDo.handleErrorMessage(null)
        }
    }, [isOnline])


    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex-1 flex justify-center">
                <div className="w-2/3 flex justify-center items-center">
                    <TaskSubmitForm />
                </div>
            </div>
            <div className="flex-1 flex justify-center relative">
                <div className="w-2/3 absolute top-30">
                    <TasksDisplay />
                </div>
            </div>
        </div>

    )
}