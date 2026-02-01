import { useLogin } from "@/hooks/useLogin";
import { createContext, useContext } from "react";

const LoginContext = createContext<ReturnType<typeof useLogin> | null>(null)

export function LoginProvider({ children }: { children: React.ReactNode }) {
    const login = useLogin()
    return (
        <LoginContext.Provider value={login}>
            {children}
        </LoginContext.Provider>
    )
}

export function useLoginCtx() {
    const ctx = useContext(LoginContext)
    if (!ctx) throw new Error("useTodo must be used inside TodoProvider")
    return ctx
}