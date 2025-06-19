'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SimpleLogoutPage() {
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
        <p className="text-xs text-slate-400 mt-2">Redirecting to home page...</p>
      </div>
    </div>
  );
} 