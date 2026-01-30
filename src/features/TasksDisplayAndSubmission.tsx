import { useEffect } from "react";
import TaskSubmitForm from "../components/features/TaskSubmitForm";
import { toast } from "sonner";
import { useToDo } from "@/contexts/ToDoContext";
import TasksDisplay from "@/components/features/TasksDisplay";
import { useServer } from "@/contexts/ServerConnectionContext";

export default function TasksDisplayAndSubmission() {

    const toDo = useToDo()
    const serverConnection = useServer()

    useEffect(() => {
        toDo.fetchToDoList()
    }, [toDo.date, serverConnection.isServerOnline, serverConnection.isOnline])

    useEffect(() => {
        if (!serverConnection.isOnline) return

        if (!serverConnection.isServerOnline && !serverConnection.wasServerOffline.current) {
            serverConnection.wasServerOffline.current = true
            toast.error("Server unavailable")
        } else if (serverConnection.isServerOnline && serverConnection.wasServerOffline.current) {
            serverConnection.wasServerOffline.current = false
            toast.success("Server connected")
        }
    }, [serverConnection.isServerOnline, serverConnection.isOnline])

    useEffect(() => {
        if (!serverConnection.isOnline && !serverConnection.wasOffline.current) {
            serverConnection.wasOffline.current = true
            toast.error("No internet connection")
            toDo.handleErrorMessage("Internet connection has been lost")
        } else if (serverConnection.isOnline && serverConnection.wasOffline.current) {
            serverConnection.wasOffline.current = false
            toast.success("Back to Online")
            toDo.handleErrorMessage(null)
        }
    }, [serverConnection.isOnline])


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