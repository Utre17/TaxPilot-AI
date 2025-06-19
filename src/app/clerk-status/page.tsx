'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export default function ClerkStatusPage() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();

  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Clerk Configuration Status</h1>
        
        <div className="space-y-4">
          {/* Environment Check */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:</span>
                <span className={clerkPublishableKey ? 'text-green-600' : 'text-red-600'}>
                  {clerkPublishableKey ? '✓ Set' : '✗ Missing'}
                </span>
              </div>
              {clerkPublishableKey && (
                <div className="text-xs text-gray-600 break-all">
                  {clerkPublishableKey.substring(0, 20)}...
                </div>
              )}
            </div>
          </div>

          {/* Auth Status */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Auth Loaded:</span>
                <span className={authLoaded ? 'text-green-600' : 'text-yellow-600'}>
                  {authLoaded ? '✓ Loaded' : '⏳ Loading...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>User Signed In:</span>
                <span className={isSignedIn ? 'text-green-600' : 'text-gray-600'}>
                  {isSignedIn ? '✓ Signed In' : '✗ Not Signed In'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>User Data Loaded:</span>
                <span className={userLoaded ? 'text-green-600' : 'text-yellow-600'}>
                  {userLoaded ? '✓ Loaded' : '⏳ Loading...'}
                </span>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">User Information</h2>
              <div className="space-y-2 text-sm">
                <div><strong>ID:</strong> {user.id}</div>
                <div><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</div>
                <div><strong>Name:</strong> {user.fullName || 'Not set'}</div>
                <div><strong>Created:</strong> {user.createdAt?.toLocaleDateString()}</div>
              </div>
            </div>
          )}

          {/* Quick Action Links */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              {!isSignedIn ? (
                <>
                  <a href="/sign-in" className="block p-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
                    Go to Sign In
                  </a>
                  <a href="/sign-up" className="block p-2 bg-green-500 text-white rounded text-center hover:bg-green-600">
                    Go to Sign Up
                  </a>
                </>
              ) : (
                <>
                  <a href="/user-profile" className="block p-2 bg-purple-500 text-white rounded text-center hover:bg-purple-600">
                    Go to Profile
                  </a>
                  <a href="/dashboard" className="block p-2 bg-indigo-500 text-white rounded text-center hover:bg-indigo-600">
                    Go to Dashboard
                  </a>
                </>
              )}
              <a href="/test-redirects" className="block p-2 bg-gray-500 text-white rounded text-center hover:bg-gray-600">
                Test All Redirects
              </a>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
            <div className="text-sm space-y-2">
              <p><strong>If Clerk isn't working:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Check that NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in .env.local</li>
                <li>Check that CLERK_SECRET_KEY is set in .env.local</li>
                <li>Restart the development server after adding env vars</li>
                <li>Verify the keys are correct in your Clerk dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 