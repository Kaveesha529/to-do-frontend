import { signUp } from "@/api/AuthApi"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function useHandleSignUp() {
    const [show, setShow] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const passwordTyping = password.length > 0
    const hasSixCharacters = password.length > 5
    const hasCapital = /[A-Z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    const emailTyping = email.length > 0
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)


    useEffect(() => {
        passwordValidate()
    }, [password])

    useEffect(() => {
        emailValidate()
    }, [email])

    const passwordValidate = () => {
        if (!passwordTyping) {
            setPasswordError(null)
            setValidPassword(false)
        } else if (!hasSixCharacters) {
            setPasswordError("Password should minimum 6 characters")
            setValidPassword(false)
        } else if (!hasCapital) {
            setPasswordError("Password should contain atleast one capital letter")
            setValidPassword(false)
        } else if (!hasSpecialChar) {
            setPasswordError("password should contain atleast one special character")
            setValidPassword(false)
        } else if (!hasNumber) {
            setPasswordError("password should contain atleast one number")
            setValidPassword(false)
        } else {
            setValidPassword(true)
            setPasswordError(null)
        }
    }

    const emailValidate = () => {
        if (!emailTyping) {
            setEmailError(null)
            setValidEmail(false)
        } else if (!isValidEmail) {
            setEmailError("Please enter a valid email")
            setValidEmail(false)
        } else {
            setEmailError(null)
            setValidEmail(true)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {
            const data = await signUp(email, password)
            console.log("message: ", data.message)
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
        success,
        setSuccess,
        setPassword,
        handleSubmit,
        validPassword,
        loading,
        passwordError,
        emailError,
        validEmail
    }
}