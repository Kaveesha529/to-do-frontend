import ToDoListPage from "@/pages/ToDoListPage";
import { Toaster } from "sonner";

export default function AppLayout() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Toaster position="top-right" />
            <ToDoListPage />
        </div>
    )
}