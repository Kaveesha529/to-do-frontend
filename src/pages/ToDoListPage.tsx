import TasksDisplayAndSubmission from "@/features/TasksDisplayAndSubmission";
import ReloadData from "@/services/ReloadData";

export default function ToDoListPage() {
    return (
        <div className="w-full h-screen">
            <ReloadData />
            <TasksDisplayAndSubmission />
        </div>
    )
}