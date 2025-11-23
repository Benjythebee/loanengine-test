'use client'
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip";
import { cn } from "@/lib/utils";
import { LucideRefreshCcw } from "lucide-react";

type RefreshButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {onClick: () => void, indicator?: number, refreshing?: boolean, disabled?: boolean}

export const RefreshButton = (props:RefreshButtonProps) => {
    const {onClick, indicator, refreshing, disabled,...rest} = props;
    const variant = !!indicator && !refreshing ? 'orange' : 'outline';

    const hidden = !indicator && !refreshing
    
    return <Tooltip>
            <TooltipTrigger asChild>
            <Button variant={variant} className={cn(hidden && "opacity-0 pointer-events-none")} size="sm" onClick={!!onClick && !disabled ? onClick : undefined} disabled={disabled} {...rest}>
             <div className={cn(refreshing ? "animate-spin" : "")}><LucideRefreshCcw /></div>
             {indicator && !refreshing?<Badge variant="secondary" className="bg-white/50 text-xs">{indicator}</Badge>:''} {refreshing?' Refreshing':' Refresh'}
            </Button>
            </TooltipTrigger>
            <TooltipContent>
                {refreshing?'Refreshing data...':(indicator?`${indicator} new update${indicator>1?'s':''} available`:'No new updates')}
            </TooltipContent>
    </Tooltip>
}