import TaskSubmitForm from "../components/features/TaskSubmitForm";
import TasksDisplay from "@/components/features/TasksDisplay";

export default function TasksDisplayAndSubmission() {

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