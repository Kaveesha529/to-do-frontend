import { login } from "@/api/AuthApi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useHandleLogin() {
    const [show, setShow] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await login(email, password)
            const message = data.message
            localStorage.setItem("token", data.token)
            console.log("message: ", message)
            if (message === "Login successfull") {
                navigate("/")
                setEmail("")
                setPassword("")
            } else if (message === "Invalid credentials") {
                toast.error("Password is wrong")
                setPassword("")
            }
        } catch (error) {
            console.error("Error in login:", error);
            toast.error("Invalid username")
        }
    }

    return {
        show,
        setShow,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit
    }
}