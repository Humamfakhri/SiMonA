import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipProps = {
    children: React.ReactNode,
    text: string,
    disabled?: boolean,
    onClick?: () => void,
}

export default function MyTooltip({children, text, disabled = false, onClick}: TooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger disabled={disabled} onClick={onClick}>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
