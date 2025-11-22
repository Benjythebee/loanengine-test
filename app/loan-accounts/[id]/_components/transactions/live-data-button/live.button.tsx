import { Button } from "@/components/primitives/button";
import { LucideCloudOff, LucidePause, LucidePlay } from "lucide-react";



export const LiveDataButton = ({liveDataEnabled, onClick, isConnected}:{liveDataEnabled:boolean, onClick: () => void, isConnected: boolean} ) => {

    const variant = !isConnected ? "destructive" : liveDataEnabled ? "default" : "outline";
    const content = !isConnected ? (`Disconnected`) : liveDataEnabled ? "Pause live updates" : "Live Updates Paused";
    
    return  <Button size="sm" disabled={!isConnected} variant={variant} onClick={isConnected ? onClick : undefined}>
                {!isConnected && (<><LucideCloudOff className="mx-2"/>{`Disconnected`}</>)} 
              {isConnected && (<>{liveDataEnabled ? <LucidePause /> : <LucidePlay />} {content}</>)}
            </Button>

}