import { ToDoProvider } from "./contexts/ToDoContext"
import { ServerConnectionProvider } from "./contexts/ConnectionContext"
import ConnectionService from "./services/ConnectionService"
import AppLayout from "./layouts/AppLayout"

function App() {

  return (
    <ServerConnectionProvider>
      <ToDoProvider>
        <ConnectionService />
        <AppLayout />
      </ToDoProvider>
    </ServerConnectionProvider>

  )
}

export default App