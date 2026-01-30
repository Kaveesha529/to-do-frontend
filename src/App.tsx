import { useEffect } from "react"
import { Toaster } from "./components/ui/sonner"
import ToDoListPage from "./pages/ToDoListPage"
import { ToDoProvider } from "./contexts/ToDoContext"
import { useServer } from "./contexts/ServerConnectionContext"

function App() {
  const serverConnection = useServer()

  useEffect(() => {

    serverConnection.checkServerConnection()

    const interval = setInterval(() => {
      serverConnection.checkServerConnection()
    }, 5000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    window.addEventListener("online", serverConnection.handleOnline)
    window.addEventListener("offline", serverConnection.handleOffline)

    return () => {
      window.removeEventListener("online", serverConnection.handleOnline)
      window.removeEventListener("offline", serverConnection.handleOffline)
    }
  }, [])

  return (
    <ToDoProvider>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Toaster position="top-right" />
        <ToDoListPage />
      </div>
    </ToDoProvider>
  )
}

export default App