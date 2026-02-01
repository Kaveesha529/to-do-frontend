import SignUpAndLoginPage from "@/pages/SignUpAndLoginPage";
import ToDoListPage from "@/pages/ToDoListPage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

export default function AppLayout() {
    return (
        <div className="flex min-h-svh">
            <Toaster position="top-right" />
            <Routes>
                <Route path='/' element={<ToDoListPage />} />
                <Route path='/login' element={<SignUpAndLoginPage />} />
            </Routes>
        </div>
    )
}