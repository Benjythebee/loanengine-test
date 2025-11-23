'use client'
import MockSocket from '@/mock/mockSocket';
import { TransactionRow } from '@/types';
import { useEffect } from 'react';
import { create } from 'zustand';

interface WebSocketState {
  isConnected: boolean;
  latestTransaction: TransactionRow | null;
  socket: MockSocket | null;
  subscribe: (loanId: string, filterTypes?: string[]) => void;
  unsubscribe: () => void;
  getSocket: () => MockSocket;
}

export const useWebSocket = create<WebSocketState>()((set, get) => ({
    isConnected: false,
    latestTransaction: null,
    socket: null,
    getSocket: () => {
        let socket = get().socket;
        if(!socket){
            socket = new MockSocket();
            set({ socket });
        }
        return socket;
    },
    subscribe: (loanId: string, filterTypes?: string[]) => {
      const socket = get().getSocket();
      
      // Clean up existing socket if any
      if (socket) {
        socket.unsubscribe();
        socket.removeAllListeners();
      }
      // Set up message listener for new transactions
      socket.on('message', (transaction: TransactionRow) => {
        // console.log('WebSocket received new transaction:', transaction);
        set({ latestTransaction: transaction });
      });

      // Subscribe to the loan
      socket.subscribe(loanId, filterTypes);

      set({ 
        isConnected: true,
        latestTransaction: null // Reset latest transaction when subscribing to new loan
      });
    },

    unsubscribe: () => {
      const { socket } = get();
      if (socket) {
        socket.unsubscribe();
        socket.removeAllListeners();
      }
      
      set({ 
        socket: null, 
        isConnected: false, 
        latestTransaction: null 
      });
    }
}))

// Custom hook for easier usage - only returns what's needed
export const useTransactionWebSocket = ({loanId, filterTypes}: {loanId: string, filterTypes?: string[]}) => {
  const { isConnected, latestTransaction, subscribe, unsubscribe } = useWebSocket();
  
    useEffect(() => {
        if(loanId){
            subscribe(loanId, filterTypes);
        }
    }, [loanId, filterTypes]);

    useEffect(() => {
        return () => {
            unsubscribe();
        };
    },[])

  return {
    isConnected,
    latestTransaction,
    subscribe,
    unsubscribe,
  };
};
