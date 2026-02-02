import { Button } from "@/components/ui/button";
import { useToDo } from "@/contexts/ToDoContext";
import { FaTrash } from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";

export default function DeleteDialog() {

    const toDo = useToDo()

    return (
        <ConfirmDialog
            title="Delete this list?"
            description="You won&apos;t be able to recover it once it&apos;s deleted."
            buttonName="Delete list"
            onClick={toDo.handleDeleteList}
            trigger={
                <Button variant={"secondary"} className="rounded-full w-10 h-10 items-center justify-center">
                    <FaTrash />
                </Button>
            }
        />
    )
}