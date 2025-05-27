'use client';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
type ErrorAlertProps = {
    message: string
}
export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <Alert variant="destructive" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 mt-1 text-red-600" />
            <div>
                <AlertTitle className="font-semibold text-lg">Error</AlertTitle>
                <AlertDescription className="text-sm">{message}</AlertDescription>
            </div>
        </Alert>

    );
}

export default ErrorAlert;
