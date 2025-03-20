import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthRedirectEvent extends CustomEvent {
  detail: {
    path: string;
    reason: 'sign_in' | 'sign_out' | string;
  };
}

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider - Handles auth-related redirects using React Router
 * This component listens for custom auth events and handles navigation
 * using React Router instead of direct window.location changes
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Handler for auth-related redirect events
    const handleAuthRedirect = (event: Event) => {
      const authEvent = event as AuthRedirectEvent;
      const { path, reason } = authEvent.detail;
      
      console.log(`AuthProvider: Handling redirect to ${path} (reason: ${reason})`);
      
      // Use React Router navigation instead of window.location
      navigate(path);
    };

    // Listen for our custom auth redirect events
    window.addEventListener('flixby:auth:redirect', handleAuthRedirect);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('flixby:auth:redirect', handleAuthRedirect);
    };
  }, [navigate]);

  // Render children without any wrapping element
  return <>{children}</>;
}

export default AuthProvider; 