import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {

    const navigate = useNavigate()

    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>404 - Not Found</EmptyTitle>
                <EmptyDescription>
                    The page you&apos;re looking for doesn&apos;t exist.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button
                    onClick={() => navigate("/todo")}
                >
                    Click
                </Button>
            </EmptyContent>
        </Empty>
    )
}