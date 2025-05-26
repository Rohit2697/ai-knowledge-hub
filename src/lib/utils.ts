import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorResponseObject = (
  message: string,
  status: number
): { message: string; status: number } => {
  return { message, status };
};
