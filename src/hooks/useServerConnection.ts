import { useRef, useState } from "react"
import * as healthApi from "@/api/HealthApi"

export function useServerConnection() {
    const [isServerOnline, setIsServerOnline] = useState<boolean>(true)
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

    const wasServerOffline = useRef<boolean>(false)
    const wasOffline = useRef<boolean>(false)

    const checkServerConnection = async () => {
    const response = await healthApi.getConnection()
    setIsServerOnline(response)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    return {
        isServerOnline,
        isOnline,
        wasServerOffline,
        wasOffline,
        checkServerConnection,
        handleOnline,
        handleOffline
    }
}