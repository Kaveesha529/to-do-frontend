import TasksDisplay from "@/features/TasksDisplayAndSubmission";

interface ToDoListPasgeProps {
    isServerOnline: boolean
}

export default function ToDoListPage({ isServerOnline }: ToDoListPasgeProps) {
    return (
        <div className="w-full h-screen">
            <TasksDisplay isServerOnline={isServerOnline} />
        </div>
    )
}