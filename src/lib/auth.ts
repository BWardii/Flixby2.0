import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export async function signInWithGoogle() {
  try {
    const origin = window.location.origin;
    const redirectUrl = `${origin}/select-plan`;

    console.log('Starting Google sign in...');
    console.log('Redirect URL:', redirectUrl);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: 'select_account',
          access_type: 'offline',
        }
      }
    });

    if (error) {
      console.error('Supabase OAuth error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in signInWithGoogle:', error);
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('popup')) {
        throw new Error('Pop-up was blocked. Please allow pop-ups for this site.');
      } else if (error.message.includes('network')) {
        throw new Error('Network error. Please check your connection.');
      }
    }
    throw error;
  }
}

export async function resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    // Get the current origin for the reset link
    const origin = window.location.origin;
    const redirectTo = `${origin}/reset-password`;

    console.log('Sending password reset email to:', email);
    console.log('Redirect URL for reset link:', redirectTo);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error in resetPassword:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

export async function updatePassword(newPassword: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Error updating password:', error);
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error in updatePassword:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }

    // Clear any stored auth data
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
  } catch (error) {
    console.error('Error in signOut:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!session) {
      return null;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

export async function initializeAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error initializing auth:', error);
      return null;
    }

    if (session) {
      const expiresAt = session.expires_at;
      if (expiresAt) {
        const timeToExpiry = expiresAt * 1000 - Date.now();
        if (timeToExpiry > 0) {
          setTimeout(async () => {
            const { error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              console.error('Error refreshing session:', refreshError);
            }
          }, timeToExpiry - 60000);
        }
      }
    }

    return session?.user || null;
  } catch (error) {
    console.error('Error in initializeAuth:', error);
    return null;
  }
}

// Add event listener for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
  
  // Emit custom event instead of directly using window.location
  if (event === 'SIGNED_IN' && window.location.pathname === '/sign-in') {
    console.log('User signed in from sign-in page:', session?.user?.email);
    
    // Check if this is a new user or returning user
    const isNewUser = session?.user?.app_metadata?.provider === 'google' && 
                      new Date(session.user.created_at).getTime() > (Date.now() - 5 * 60 * 1000);
    
    // Dispatch a custom event for our AuthProvider to handle
    const redirectPath = isNewUser ? '/select-plan' : '/my-assistant/create';
    console.log(`Auth event: should redirect to ${redirectPath}`);
    
    // Dispatch a custom event that our React components can listen for
    window.dispatchEvent(
      new CustomEvent('flixby:auth:redirect', {
        detail: { path: redirectPath, reason: 'sign_in' }
      })
    );
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
    
    // If on a protected route, redirect to home using custom event
    const protectedRoutes = ['/my-assistant', '/select-plan'];
    const currentPath = window.location.pathname;
    
    if (protectedRoutes.some(route => currentPath.startsWith(route))) {
      window.dispatchEvent(
        new CustomEvent('flixby:auth:redirect', {
          detail: { path: '/', reason: 'sign_out' }
        })
      );
    }
  }
});