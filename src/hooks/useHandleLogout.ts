import { useNavigate } from "react-router-dom"

export function useHandleLogout() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
        console.log("Okay")
    }

    return {
        handleLogout
    }
}