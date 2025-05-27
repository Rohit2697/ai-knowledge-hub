import React from 'react';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu';
const ProfileMenu = () => {
    const handleLogout = async () => {
        await fetch('/api/logout');
        window.location.href = '/login';
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
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}

export default ProfileMenu;
