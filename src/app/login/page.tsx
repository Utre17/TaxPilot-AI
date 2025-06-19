'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Preserve any query parameters from the original URL
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams.toString();
    const redirectUrl = searchParams ? `/sign-in?${searchParams}` : '/sign-in';
    
    // Redirect to the new Clerk sign-in page
    router.replace(redirectUrl);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swiss-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to sign in...</p>
      </div>
    </div>
  );
} 