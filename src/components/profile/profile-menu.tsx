'use client';
import React from 'react';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu';
import { usePostStore } from '@/hooks/usePostStore';
//import { useHeadingStore } from '@/hooks/useHeadingStore';
const ProfileMenu = () => {
    //const { setHeading } = useHeadingStore()
    const { setPosts } = usePostStore()
    const handleLogout = async () => {
        await fetch('/api/logout');
        //setHeading('Latest Articles')
        window.location.href = '/login';
    }

    const handleMyArticle = async () => {
        //setHeading('My Articles')
        try {
            const res = await fetch('/api/user/articles')
            if (!res.ok) return setPosts([])
            setPosts(await res.json())
        } catch {
            setPosts([])
        }

    }
    return (
        <DropdownMenuContent
            className="mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2"
            align="end"
        >
            <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-violet-100 text-sm font-medium cursor-pointer transition-colors" onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-violet-100 text-sm font-medium cursor-pointer transition-colors" onClick={handleMyArticle}>
                    My Article
                </DropdownMenuItem>


            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}

export default ProfileMenu;
