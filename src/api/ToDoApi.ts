import api from "./GetApi"

export const getToDoList = async (
    date: string
) => {
    const {data} = await api.get("/", {
        params: { date }
    })
    return data
}

export const deleteList = async (
    toDoListId: string
) => {
    const {data} = await api.delete(`/${toDoListId}`)
    return data
}

export const deleteTask = async (
    toDoListId: string,
     taskId: string
    ) => {
    const {data} = await api.delete(`/${toDoListId}/tasks/${taskId}`)
    return data
}

export const updateTaskName = async (
    toDoListId: string,
     taskId: string, 
     updatedTaskName: string
    ) => {
    const {data} = await api.patch(`/${toDoListId}/tasks/${taskId}`, {
        name: updatedTaskName
    })
    return data
}

export const updateTaskStatus= async (
    toDoListId: string, 
    taskId: string, 
    newStatus: "pending" | "done"
) => {
    const {data} = await api.patch(`/${toDoListId}/tasks/${taskId}`, {
        status: newStatus
    })
    return data
}

export const createTask= async (
    date: Date, 
    taskName: string,
) => {
    const {data} = await api.post("/create", {
        date,
        tasks: [{ name: taskName }]
    })
    return data
}