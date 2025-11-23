'use client'
import MockSocket from '@/mock/mockSocket';
import { TransactionRow } from '@/types';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useEffect } from 'react';
import { create } from 'zustand';

interface WebSocketState {
  isConnected: boolean;
  latestTransaction: TransactionRow | null;
  socket: MockSocket | null;
  subscribe: (loanId: string, columnFilters?: ColumnFiltersState) => void;
  unsubscribe: () => void;
  getSocket: () => MockSocket;
  onUpdateCallbacks: Map<string, (tx: TransactionRow) => void>;
  onUpdate: (callback: (tx: TransactionRow) => void) => string;
  removeOnUpdate: (key: string) => void;
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
    onUpdateCallbacks: new Map(),
    onUpdate: (callback: (tx: TransactionRow) => void) => {
      const callbacks = get().onUpdateCallbacks;
      const callbackKey = Date.now().toString()
      callbacks.set(Date.now().toString(), callback);
      set({ onUpdateCallbacks: callbacks });
      return callbackKey
    },
    removeOnUpdate: (key: string) => {
      const callbacks = get().onUpdateCallbacks;
      callbacks.delete(key);
      set({ onUpdateCallbacks: callbacks });
    },
    subscribe: (loanId: string, columnFilters?: ColumnFiltersState) => {
      const socket = get().getSocket();
      
      // Clean up existing socket if any
      if (socket) {
        socket.unsubscribe();
        socket.removeAllListeners();
      }
      // Set up message listener for new transactions
      socket.on('latestTx', (transaction: TransactionRow) => {
        // console.log('WebSocket received new transaction:', transaction);
        set({ latestTransaction: transaction });
      });

      socket.on('update', (transaction: TransactionRow) => {
        // console.log('WebSocket received new transaction:', transaction);
        get().onUpdateCallbacks.forEach(cb => cb(transaction));
      });

      // Subscribe to the loan
      socket.subscribe(loanId, columnFilters);

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

      console.log('WebSocket unsubscribed');
      
      set({ 
        isConnected: false, 
        latestTransaction: null 
      });
    }
}))

// Custom hook for easier usage - only returns what's needed
export const useTransactionWebSocket = ({loanId, columnFilters}: {loanId: string, columnFilters?: ColumnFiltersState}) => {
  const { isConnected, latestTransaction, subscribe, unsubscribe } = useWebSocket();
  
    useEffect(() => {
        if(loanId){
            subscribe(loanId, columnFilters);
        }
        return () => {
            unsubscribe();
        };
    }, [loanId, columnFilters]);


  return {
    isConnected,
    latestTransaction,
    subscribe,
    unsubscribe,
  };
};
