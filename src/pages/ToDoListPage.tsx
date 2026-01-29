import TasksDisplay from "@/features/TasksDisplay";

interface ToDoListPasgeProps {
    isServerOnline: boolean
}

export default function ToDoListPage({ isServerOnline }: ToDoListPasgeProps) {
    return (
        <TasksDisplay isServerOnline={isServerOnline} />
    )
}