import Header from "@/components/features/Header";
import TasksDisplayAndSubmission from "@/features/TasksDisplayAndSubmission";
import ReloadData from "@/services/ReloadData";

export default function ToDoListPage() {
    return (
        <div className="w-full h-screen">
            <ReloadData />
            <Header />
            <TasksDisplayAndSubmission />
        </div>
    )
}