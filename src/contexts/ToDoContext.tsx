import { useToDoList } from "@/hooks/useToDoList";
import type React from "react";
import { createContext, useContext } from "react";

const ToDoContext = createContext<ReturnType<typeof useToDoList> | null>(null)

export function ToDoProvider({ children }: { children: React.ReactNode }) {
    const toDo = useToDoList()
    return (
        <ToDoContext.Provider value={toDo}>
            {children}
        </ToDoContext.Provider>
    )
}

export function useToDo() {
    const ctx = useContext(ToDoContext)
    if (!ctx) throw new Error("useTodo must be used inside TodoProvider")
    return ctx

}