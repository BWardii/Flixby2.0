import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, AlertCircle, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { updatePassword } from '../lib/auth';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  // Check if we have a session (indicating the user clicked a valid reset link)
  useEffect(() => {
    const checkSession = async () => {
      // Check for valid session
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session, we're in an invalid state
      if (!session) {
        // This page should only be accessed from a password reset link
        setError('Invalid or expired password reset link. Please request a new password reset link.');
      }
    };

    checkSession();
  }, []);

  const checkPasswordStrength = (password: string) => {
    // Basic password strength check
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const score = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      setPasswordStrength(checkPasswordStrength(newPassword));
    } else {
      setPasswordStrength(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      // Always use Supabase to update the password since it's now configured
      const { success, error } = await updatePassword(password);
      
      if (!success) throw new Error(error || 'Failed to update password');
      
      setSuccess(true);
      
      // Redirect to sign in after a delay
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-purple-900/30 via-indigo-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-teal-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}></div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="flex items-center justify-center space-x-2 bg-gray-800/50 backdrop-blur-lg rounded-full px-4 py-2 mb-4 sm:mb-6 border border-gray-700/50">
                <Lock className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Security</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Reset Your Password
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Create a new secure password for your account
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-6 sm:p-8">
            {success ? (
              <div className="text-center py-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Password Reset Successfully!</h3>
                <p className="text-gray-400 mb-4">
                  Your password has been updated. You'll be redirected to the sign in page shortly.
                </p>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Go to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter new password"
                    />
                  </div>

                  {passwordStrength && (
                    <div className="mt-2">
                      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                          style={{ 
                            width: passwordStrength === 'weak' ? '33%' : 
                                  passwordStrength === 'medium' ? '66%' : '100%' 
                          }}
                        ></div>
                      </div>
                      <p className={`text-xs mt-1 ${
                        passwordStrength === 'weak' ? 'text-red-400' : 
                        passwordStrength === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {passwordStrength === 'weak' ? 'Weak password' : 
                         passwordStrength === 'medium' ? 'Medium strength password' : 'Strong password'}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm">{error}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-medium hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <ArrowRight className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm text-gray-400">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    <span>Secure password reset</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 