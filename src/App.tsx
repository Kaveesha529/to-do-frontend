import { useEffect, useState } from "react"
import { Toaster } from "./components/ui/sonner"
import ToDoListPage from "./pages/ToDoListPage"
import api from "./api/GetApi"

function App() {
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true)

  const checkConnection = async () => {
    try {
      await api.get("/health")
      setIsServerOnline(true)
    } catch (error) {
      setIsServerOnline(false)
    }
  }

  useEffect(() => {

    checkConnection()

    const interval = setInterval(() => {
      checkConnection()
    }, 5000)

    return () => clearInterval(interval)
  })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Toaster position="top-right" />
      <ToDoListPage isServerOnline={isServerOnline} />
    </div>
  )
}

export default App