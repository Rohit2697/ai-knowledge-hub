'use client';
import React, { useState } from 'react';
import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (!email || !password) {
            setLoading(false)
            return setError('Enter email and password')
        }
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: formData
            })
            if (!res.ok) {
                const data = await res.json()
                setLoading(false)
                setError(data.message || 'Login failed')
                return;
            }
            setLoading(false)
            router.push('/')
        } catch {
            setLoading(false)
            setError('Something went wrong!')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {loading && <div className="absolute inset-0 z-10 flex items-center justify-center  bg-opacity-60 rounded-xl">
                <Spinner size="large" className="text-violet-600" />
            </div>}
            <Card className={cn(
                "shadow-lg border w-[400px] border-gray-200 rounded-xl bg-white transition-opacity duration-300",
                loading ? "opacity-50 pointer-events-none" : "opacity-100"
            )}>
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold text-violet-700">
                        AI-Powered Knowledge Hub
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Login
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                            />
                        </div>
                        {error && <p className="text-red-600 mb-4 text-sm  text-center">{error}</p>}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
                            <Button
                                type="submit"
                                className="w-full sm:w-1/2 bg-violet-600 hover:bg-violet-700 transition text-white font-semibold"
                            >
                                Login
                            </Button>
                            <Link href="/signup" className="w-full sm:w-1/2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full text-violet-600 border-violet-600 hover:bg-violet-50 font-semibold"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>



                    </form>
                </CardContent>

                <CardFooter className="justify-center text-center text-sm text-gray-500">
                    By Rohit Dey
                </CardFooter>
            </Card>
        </div>


    );
}

export default LoginForm;
