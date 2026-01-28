import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react"
import AddTaskDialog from "./AddTaskDialog";

interface TaskCardProps {
    value: string
    addTask: () => void
    onChange: (value: string) => void
    editInitialTaskName: (taskName: string) => void
}

export default function EmptyTasksCard({ addTask, onChange, value, editInitialTaskName }: TaskCardProps) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>No Tasks Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any tasks yet for this day. Get started by creating
                    your first task for this day.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <AddTaskDialog
                    addTask={() => addTask()}
                    onChange={onChange}
                    value={value}
                    editInitialTaskName={() => editInitialTaskName("")}
                />
            </EmptyContent>
        </Empty>
    )
}