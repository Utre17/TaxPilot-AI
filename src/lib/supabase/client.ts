import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

// Client-side Supabase client for React components
// This client is used in components and client-side code
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper function to get the current user session
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  
  return session?.user || null;
};

// Helper function to get user profile data
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
  
  return data;
};

// Helper function to update user profile
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
};

// Helper function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Helper function to check if user has valid subscription
export const hasValidSubscription = async (userId: string) => {
  const profile = await getUserProfile(userId);
  
  if (!profile) return false;
  
  return profile.subscription_status === 'active' || profile.subscription_status === 'trial';
}; 