'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Preserve any query parameters from the original URL
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams.toString();
    const redirectUrl = searchParams ? `/user-profile?${searchParams}` : '/user-profile';
    
    // Redirect to the new Clerk user profile page
    router.replace(redirectUrl);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swiss-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to account settings...</p>
      </div>
    </div>
  );
} 