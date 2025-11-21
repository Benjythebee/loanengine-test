import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Capitalize the first letter of a string
 *
 * @example
 * capitalize('hello') // 'Hello'
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Simulate network delay
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}