'use client';
import React from 'react';
import Link from 'next/link';

import { Button } from './ui/button';
export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-semibold">AI-Powered Knowledge Hub</h1>
      <div className="flex items-center gap-6">
        <Link href="/search" className="hover:text-violet-600">
          Search
        </Link>
        <Link href="/summarize" className="hover:text-violet-600">
          Summarize
        </Link>
        <Link href="/qa" className="hover:text-violet-600">
          Q&A
        </Link>
        <Link href="/articles/new">
          <Button className="bg-violet-500" variant="secondary">
            Post Article
          </Button>
        </Link>
      </div>
    </nav>
  );
}
