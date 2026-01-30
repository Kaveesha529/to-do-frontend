import TasksDisplayAndSubmission from "@/features/TasksDisplayAndSubmission";
import type { useRef } from "react";

interface ToDoListPasgeProps {
    isServerOnline: boolean
    isOnline: boolean
    wasServerOffline: ReturnType<typeof useRef<boolean>>
    wasOffline: ReturnType<typeof useRef<boolean>>
}

export default function ToDoListPage({ isServerOnline, isOnline, wasServerOffline, wasOffline }: ToDoListPasgeProps) {
    return (
        <div className="w-full h-screen">
            <TasksDisplayAndSubmission isServerOnline={isServerOnline} isOnline={isOnline} wasServerOffline={wasServerOffline} wasOffline={wasOffline} />
        </div>
    )
}