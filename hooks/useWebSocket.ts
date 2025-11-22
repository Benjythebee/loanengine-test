import { mockWebSocket } from "@/mock/mockSocket";
import { useEffect, useEffectEvent, useState } from "react";

export const useWebSocket = () => {
    const [ws, setWs] = useState<ReturnType<typeof mockWebSocket>|null>(null);

    const [isConnected, setIsConnected] = useState(false);
    const [subscribers, setSubscribers] = useState<((data: any) => void)[]>([]);

    const onMessageSubscribed = useEffectEvent((data: any) => {
        console.log(subscribers)
        subscribers.forEach(subscriber => subscriber(data));      
    })

    const connect = () => {
        const ws = mockWebSocket(); // Replace with new WebSocket(url) for real implementation
        setWs(ws);
        ws.onopen = () => {
            setIsConnected(true);
        }
        ws.onmessage = onMessageSubscribed
        ws.onclose = () => {
            setIsConnected(false);
        }

        ws.onopen();
    }

    const disconnect = () => {
        ws?.disconnect();
        setWs(null);
    }

    const subscribe = (callback: (data: any) => void) => {
        setSubscribers(prev => [...prev, callback]);
    }

    const unsubscribe = (callback: (data: any) => void) => {
        setSubscribers(prev => prev.filter(sub => sub !== callback));
    }

    useEffect(() => {
        if(!ws){
            connect();
        }
    }, [ws]);

    return { isConnected, connect, disconnect, subscribe, unsubscribe, ws };

}