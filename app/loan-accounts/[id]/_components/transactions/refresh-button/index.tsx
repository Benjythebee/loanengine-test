import { Button } from "@/components/primitives/button"
import { cn } from "@/lib/utils"
import { LucideRefreshCcw } from "lucide-react"



export const RefreshButton = ({onClick, disabled}:{onClick: () => void, disabled?: boolean}) => {

    return <Button variant={'orange'} className={cn(disabled?'opacity-0 pointer-events-none':'')} size="sm" onClick={onClick} disabled={disabled}>
             <LucideRefreshCcw /> Refresh
            </Button>
}