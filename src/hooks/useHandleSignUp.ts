import { signUp } from "@/api/AuthApi"
import { useState } from "react"
import { toast } from "sonner"

export function useHandleSignUp() {
    const [show, setShow] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await signUp(email, password)
            if (data.message === "User registered successfully") {
                setEmail("")
                setPassword("")
                toast.success("You registered successfully")
                setSuccess(true)
            }
        } catch (error) {
            console.error("Error in sign up:", error);
            setEmail("")
            setPassword("")
            toast.error("User already exists with that username")
        }
    }

    return {
        show,
        setShow,
        email,
        setEmail,
        password,
        success,
        setSuccess,
        setPassword,
        handleSubmit
    }
}