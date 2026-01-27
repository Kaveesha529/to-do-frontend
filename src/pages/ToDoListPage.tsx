import TaskSubmitForm from "@/features/TaskSubmitForm";

export default function ToDoListPage() {
    return(
        <div className="flex flex-row w-full">
            <div className="flex-1 flex justify-center">
                <div className="w-1/2">
                    <TaskSubmitForm></TaskSubmitForm>
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    )
}