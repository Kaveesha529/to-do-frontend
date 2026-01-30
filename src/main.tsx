import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ServerConnectionProvider } from './contexts/ServerConnectionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServerConnectionProvider>
      <App />
    </ServerConnectionProvider>
  </StrictMode>,
)
