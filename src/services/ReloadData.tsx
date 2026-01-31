import { useConn } from "@/contexts/ConnectionContext"
import { useToDo } from "@/contexts/ToDoContext"
import { useEffect } from "react"

export default function ReloadData() {

    const toDo = useToDo()
    const { isOnline, isServerOnline } = useConn()

    useEffect(() => {
        toDo.fetchToDoList()
    }, [toDo.date, isServerOnline, isOnline])

    return null
}