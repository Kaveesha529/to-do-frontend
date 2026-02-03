import api from "@/api/UserApi"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState<boolean>(true)
    const [authorized, setAuthorized] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true
        const checkAuth = async () => {
            try {
                await api.get('/auth/me')
                if (isMounted) setAuthorized(true)
            } catch (error) {
                if (isMounted) {
                    setAuthorized(false)
                    console.error("Unauthorized access: ", error)
                }
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        checkAuth()

        return () => {
            isMounted = false
        }
    }, [])

    if (loading) return null

    if (!authorized) {
        return <Navigate to="/" replace />
    }

    return children
}