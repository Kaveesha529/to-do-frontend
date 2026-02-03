import { logout } from "@/api/AuthApi"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useHandleLogout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const data = await logout()
        navigate("/")
        toast.success(data.message)
        console.log(data.message)
    }

    return {
        handleLogout
    }
}