'use client';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
type ErrorAlertProps = {
    message: string
}
export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <Alert variant="destructive" className='bg-red-300 border-none rounded shadow font-bold'>
            <AlertCircle className='h-4 w-4'></AlertCircle>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

export default ErrorAlert;
