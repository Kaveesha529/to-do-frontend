import TasksDisplay from "@/features/TasksDisplay";
import TaskSubmitForm from "@/features/TaskSubmitForm";

export default function ToDoListPage() {
    return(
        <div className="flex flex-row w-full">
            <div className="flex-1 flex justify-center">
                <div className="w-2/3">
                    <TaskSubmitForm/>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="w-2/3">
                    <TasksDisplay/>
                </div>
            </div>
        </div>
    )
}