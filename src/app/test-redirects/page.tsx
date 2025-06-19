'use client';

import Link from 'next/link';

export default function TestRedirectsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Test All Redirect Links</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold mb-3">Old Auth Routes (Should Redirect)</h2>
            
            <Link 
              href="/register" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /register → /sign-up
            </Link>
            
            <Link 
              href="/login" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /login → /sign-in
            </Link>
            
            <Link 
              href="/auth/signin" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /auth/signin → /sign-in
            </Link>
            
            <Link 
              href="/auth/signup" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /auth/signup → /sign-up
            </Link>
            
            <Link 
              href="/profile" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /profile → /user-profile
            </Link>
            
            <Link 
              href="/account" 
              className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              /account → /user-profile
            </Link>
            
            <Link 
              href="/logout" 
              className="block p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              /logout → Signs out + Home
            </Link>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl font-semibold mb-3">Direct Clerk Routes</h2>
            
            <Link 
              href="/sign-up" 
              className="block p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              /sign-up (Direct Clerk)
            </Link>
            
            <Link 
              href="/sign-in" 
              className="block p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              /sign-in (Direct Clerk)
            </Link>
            
            <Link 
              href="/user-profile" 
              className="block p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              /user-profile (Direct Clerk)
            </Link>
            
            <Link 
              href="/dashboard" 
              className="block p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              /dashboard (Protected)
            </Link>
            
            <Link 
              href="/calculator" 
              className="block p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              /calculator (Public)
            </Link>
            
            <Link 
              href="/" 
              className="block p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              / (Home)
            </Link>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Testing Instructions:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Click each "Old Auth Routes" link - they should redirect to the corresponding Clerk page</li>
            <li>• Click "Direct Clerk Routes" - they should work immediately</li>
            <li>• Check browser console for any redirect logs</li>
            <li>• Verify URL changes happen correctly</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 