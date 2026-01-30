import { useEffect, useState, useRef } from "react"
import { Toaster } from "./components/ui/sonner"
import ToDoListPage from "./pages/ToDoListPage"
import api from "./api/GetApi"
import { ToDoProvider } from "./contexts/ToDoContext"

function App() {
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true)
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

  const wasServerOffline = useRef<boolean>(false)
  const wasOffline = useRef<boolean>(false)

  const checkServerConnection = async () => {
    try {
      await api.get("/health")
      setIsServerOnline(true)
    } catch (error) {
      setIsServerOnline(false)
    }
  }

  useEffect(() => {

    checkServerConnection()

    const interval = setInterval(() => {
      checkServerConnection()
    }, 5000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <ToDoProvider>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Toaster position="top-right" />
        <ToDoListPage isServerOnline={isServerOnline} isOnline={isOnline} wasServerOffline={wasServerOffline} wasOffline={wasOffline} />
      </div>
    </ToDoProvider>
  )
}

export default App