import { useConn } from "@/contexts/ConnectionContext"
import { useToDo } from "@/contexts/ToDoContext"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export default function ConnectionService() {

    const wasServerOffline = useRef<boolean>(false)
    const wasOffline = useRef<boolean>(false)

    const { isOnline, isServerOnline } = useConn()
    const toDo = useToDo()

    useEffect(() => {
        if (!isOnline) return

        if (!isServerOnline && !wasServerOffline.current) {
            wasServerOffline.current = true
            toast.error("Server unavailable")
        } else if (isServerOnline && wasServerOffline.current) {
            wasServerOffline.current = false
            toast.success("Server connected")
        }
    }, [isServerOnline, isOnline])

    useEffect(() => {
        if (!isOnline && !wasOffline.current) {
            wasOffline.current = true
            toast.error("No internet connection")
            toDo.handleErrorMessage("Internet connection has been lost")
        } else if (isOnline && wasOffline.current) {
            wasOffline.current = false
            toast.success("Back to Online")
            toDo.handleErrorMessage(null)
        }
    }, [isOnline])

    return null
}