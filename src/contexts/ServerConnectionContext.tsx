import { useServerConnection } from "@/hooks/useServerConnection";
import type React from "react";
import { createContext, useContext } from "react";

const ServerConnectionContext = createContext<ReturnType<typeof useServerConnection> | null>(null)

export function ServerConnectionProvider({ children }: { children: React.ReactNode }) {
    const serverConnection = useServerConnection()
    return (
        <ServerConnectionContext.Provider value={serverConnection}>
            {children}
        </ServerConnectionContext.Provider>
    )
}

export function useServer() {
    const ctx = useContext(ServerConnectionContext)
    if (!ctx) throw new Error("useServer must be used inside ServerConnectionProvider")
    return ctx
}