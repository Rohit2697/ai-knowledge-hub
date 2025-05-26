import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import readtime from "reading-time";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorResponseObject = (
  message: string,
  status: number
): { message: string; status: number } => {
  return { message, status };
};

export const readTime = (content: string): string => {
  const stats = readtime(content);
  return stats.text;
};


export function timestampToDateTimeString(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString().replace(/T/, ' ').slice(0, -5); // "2022-03-14T16:39:12.000Z" -> "2022-03-14 16:39:12"
}


