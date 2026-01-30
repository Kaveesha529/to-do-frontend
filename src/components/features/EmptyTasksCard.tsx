import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react"
import AddTaskDialog from "./AddTaskDialog";

export default function EmptyTasksCard() {
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
                <AddTaskDialog />
            </EmptyContent>
        </Empty>
    )
}