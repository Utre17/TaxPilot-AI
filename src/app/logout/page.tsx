'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function LogoutRedirectPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        router.replace('/');
      } catch (error) {
        console.error('Error signing out:', error);
        router.replace('/');
      }
    };

    handleLogout();
  }, [signOut, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swiss-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Signing out...</p>
      </div>
    </div>
  );
} 