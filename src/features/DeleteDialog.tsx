import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa";

interface DeleteDialogProps {
    handleDelete: () => void
}

export default function DeleteDialog({ handleDelete }: DeleteDialogProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={"secondary"} className="rounded-full w-10 h-10 items-center justify-center">
                        <FaTrash />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete this list?</DialogTitle>
                        <DialogDescription>
                            You won&apos;t be able to recover it once it&apos;s deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleDelete}>Delete list</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}