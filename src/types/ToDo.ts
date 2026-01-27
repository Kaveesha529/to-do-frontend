export interface TodoList {
    _id: string;
    date: string;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    _id: string;
    name: string;
    status: "pending" | "done";
}