import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

// Server-side Supabase client for server components and API routes
// This client is used in server components, API routes, and middleware
export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

// Helper function to get user session on the server
export const getServerSession = async () => {
  const supabase = createServerSupabaseClient();
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting server session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error in getServerSession:', error);
    return null;
  }
};

// Helper function to get user profile on the server
export const getServerUserProfile = async () => {
  const session = await getServerSession();
  
  if (!session?.user) {
    return null;
  }
  
  const supabase = createServerSupabaseClient();
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) {
      console.error('Error getting server user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getServerUserProfile:', error);
    return null;
  }
};

// Helper function to require authentication on the server
export const requireServerAuth = async () => {
  const session = await getServerSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }
  
  return session;
};

// Helper function to require valid subscription on the server
export const requireValidSubscription = async () => {
  const session = await requireServerAuth();
  const profile = await getServerUserProfile();
  
  if (!profile || (profile.subscription_status !== 'active' && profile.subscription_status !== 'trial')) {
    throw new Error('Valid subscription required');
  }
  
  return { session, profile };
}; 