import { useConnection } from "@/hooks/useConnection";
import type React from "react";
import { createContext, useContext } from "react";

const ConnectionContext = createContext<ReturnType<typeof useConnection> | null>(null)

export function ServerConnectionProvider({ children }: { children: React.ReactNode }) {
    const Connection = useConnection()
    return (
        <ConnectionContext.Provider value={Connection}>
            {children}
        </ConnectionContext.Provider>
    )
}

export function useConn() {
    const ctx = useContext(ConnectionContext)
    if (!ctx) throw new Error("useServer must be used inside ServerConnectionProvider")
    return ctx
}