import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolTipCardprops {
    trigger: React.ReactNode,
    description: string
}

export default function ToolTipCard({ trigger, description }: ToolTipCardprops) {
    return (
        <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
                {trigger}
            </TooltipTrigger>
            <TooltipContent>
                <p>{description}</p>
            </TooltipContent>
        </Tooltip>
    )
}