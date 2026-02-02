import { Button } from "../ui/button";
import { useHandleLogout } from "@/hooks/useHandleLogout";

export default function Header() {

    const { handleLogout } = useHandleLogout()

    return (
        <div className="flex w-full h-20 z-50 bg-green-300 fixed top-0 justify-end">
            <div className="flex h-full w-[10%] items-center justify-center">
                <Button
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}