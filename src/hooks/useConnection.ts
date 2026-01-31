import { useEffect, useState } from "react"
import * as healthApi from "@/api/HealthApi"

export function useConnection() {
    const [isServerOnline, setIsServerOnline] = useState<boolean>(true)
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

    const checkServerConnection = async () => {
        const response = await healthApi.getConnection()
        setIsServerOnline(response)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)


    useEffect(() => {

        checkServerConnection()

        const interval = setInterval(() => {
            checkServerConnection()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return {
        isServerOnline,
        isOnline,
    }
}