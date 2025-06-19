'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('RegisterRedirectPage: Starting redirect process');
    
    const redirectToSignUp = () => {
      try {
        // Preserve any query parameters from the original URL
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams.toString();
        const redirectUrl = searchParams ? `/sign-up?${searchParams}` : '/sign-up';
        
        console.log('RegisterRedirectPage: Redirecting to:', redirectUrl);
        
        // Redirect to the new Clerk sign-up page
        router.replace(redirectUrl);
      } catch (error) {
        console.error('RegisterRedirectPage: Error during redirect:', error);
        router.replace('/sign-up');
      }
    };

    // Add a small delay to ensure the page renders first
    const timer = setTimeout(redirectToSignUp, 500);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swiss-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to sign up...</p>
        <p className="text-xs text-slate-400 mt-2">If you're not redirected automatically, <a href="/sign-up" className="text-swiss-blue-500 hover:underline">click here</a></p>
      </div>
    </div>
  );
} 