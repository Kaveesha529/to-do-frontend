import NotFoundPage from "@/pages/NotFoundPage";
import SignUpAndLoginPage from "@/pages/SignUpAndLoginPage";
import ToDoListPage from "@/pages/ToDoListPage";
import ProtectedRoute from "@/services/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

export default function AppLayout() {
    return (
        <div className="flex min-h-svh">
            <Toaster position="top-right" />
            <Routes>
                <Route path='/' element={<SignUpAndLoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/todo' element={
                    <ProtectedRoute>
                        <ToDoListPage />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </div>
    )
}