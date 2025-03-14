import React, { useEffect, useState } from 'react';
import { LogIn, LogOut, Loader2, User as UserIcon, AlertCircle } from 'lucide-react';
import { signInWithGoogle, signOut, getCurrentUser, initializeAuth } from '../lib/auth';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthButton() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Get the current session directly from supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setUser(session?.user || null);
        setError(null);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initialize();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut();
      setUser(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-500/20 text-red-400">
        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">Error</span>
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-green-500/50"
      >
        <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-green-500/50"
      >
        {user.user_metadata.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name || 'User'}
            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
          />
        ) : (
          <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        )}
        <span className="max-w-[80px] sm:max-w-[120px] truncate text-xs sm:text-sm">
          {user.user_metadata.full_name || user.email?.split('@')[0] || 'User'}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 sm:w-48 rounded-lg bg-gray-800/90 backdrop-blur-lg shadow-lg py-1 border border-gray-700/50 z-50">
          <button
            onClick={() => {
              navigate('/my-assistant');
              setShowDropdown(false);
            }}
            className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          >
            <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>My Dashboard</span>
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}