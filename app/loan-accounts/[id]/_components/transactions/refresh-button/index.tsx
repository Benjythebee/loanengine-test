import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { cn } from "@/lib/utils";
import { LucideRefreshCcw } from "lucide-react";



export const RefreshButton = ({onClick,indicator, refreshing, disabled}:{onClick: () => void, indicator?: number, refreshing?: boolean, disabled?: boolean}) => {

    const variant = !!indicator && !refreshing ? 'orange' : 'outline';

    const hidden = !indicator && !refreshing
    
    return <Button variant={variant} className={cn(hidden && "opacity-0 pointer-events-none")} size="sm" onClick={onClick} disabled={disabled}>
             <div className={cn(refreshing ? "animate-spin" : "")}><LucideRefreshCcw /></div>
             {indicator && !refreshing?<Badge variant="secondary" className="bg-white/50 text-xs">{indicator}</Badge>:''} {refreshing?' Refreshing':' Refresh'}
            </Button>
}