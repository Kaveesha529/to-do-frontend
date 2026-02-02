import { login } from "@/api/AuthApi"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useHandleLogin() {
    const [show, setShow] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const passwordTyping = password.length > 0
    const hasSixCharacters = password.length > 5

    const emailTyping = email.length > 0
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const navigate = useNavigate()

    useEffect(() => {
        passwordValidate()
    }, [password])

    useEffect(() => {
        emailValidate()
    }, [email, password])

    const passwordValidate = () => {
        if (!hasSixCharacters) {
            setValidPassword(false)
        } else {
            setValidPassword(true)
        }
    }

    const emailValidate = () => {
        if (!emailTyping) {
            setValidEmail(false)
            setEmailError(null)
        } else if (passwordTyping && !isValidEmail) {
            setEmailError("Please enter a valid email")
        } else if (!isValidEmail) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
            setEmailError(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {
            const data = await login(email, password)
            const message = data.message
            console.log("message: ", message)
            if (message === "Login successfull") {
                localStorage.setItem("token", data.token)
                navigate("/todo")
                setEmail("")
                setPassword("")
            } else if (message === "Invalid credentials") {
                toast.error("Password is wrong")
                setPassword("")
            }
        } catch (error) {
            console.error("Error in login:", error);
            toast.error("Invalid username")
        } finally {
            setLoading(false)
        }
    }

    return {
        show,
        setShow,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        validPassword,
        loading,
        passwordError,
        emailError,
        validEmail
    }
}