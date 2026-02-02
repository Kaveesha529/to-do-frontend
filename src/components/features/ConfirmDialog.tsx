import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ConfirmDialogProps {
    title: string,
    description?: string,
    buttonName: string,
    onClick: () => void,
    trigger: React.ReactNode
}

export default function ConfirmDialog({ title, description, buttonName, onClick, trigger }: ConfirmDialogProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={onClick}>{buttonName}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}