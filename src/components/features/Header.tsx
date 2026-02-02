import { Button } from "../ui/button";
import { useHandleLogout } from "@/hooks/useHandleLogout";
import ConfirmDialog from "./ConfirmDialog";

export default function Header() {

    const { handleLogout } = useHandleLogout()

    return (
        <div className="flex w-full h-20 z-50 bg-green-300 fixed top-0 justify-end">
            <div className="flex h-full w-[10%] items-center justify-center">
                <ConfirmDialog
                    title="Confirm Logout"
                    buttonName="Confirm"
                    onClick={handleLogout}
                    trigger={
                        <Button>
                            Logout
                        </Button>
                    }
                />
            </div>
        </div>
    )
}