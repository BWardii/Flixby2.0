import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Loader2, Bot, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { signInWithGoogle } from '../lib/auth';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/create-assistant');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      await signInWithGoogle();
      // The redirect will happen automatically
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  const benefits = [
    "Access your AI assistant dashboard",
    "Manage your voice configurations",
    "View call logs and analytics",
    "Update your business information"
  ];

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div>
              <div className="text-center lg:text-left mb-6 sm:mb-8">
                <div className="inline-block">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-800/50 backdrop-blur-lg rounded-full px-4 py-2 mb-4 sm:mb-6 border border-gray-700/50">
                    <LogIn className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-gray-300">Welcome Back</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                    Sign In to Your Account
                  </span>
                </h1>
                <p className="text-gray-400 text-base sm:text-lg">
                  Access your AI assistant and manage your settings
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-6 sm:p-8">
                <form onSubmit={handleEmailSignIn} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <button type="button" className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter your password"
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
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="h-5 w-5 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800/80 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading}
                      className="w-full bg-gray-800/80 text-white px-6 py-3.5 rounded-xl font-medium border border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {googleLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Connecting to Google...</span>
                        </>
                      ) : (
                        <>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <span>Sign in with Google</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm text-gray-400">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                      <span>Secure authentication</span>
                    </div>
                  </div>
                </form>

                <div className="mt-6 sm:mt-8 text-center border-t border-gray-700/50 pt-4 sm:pt-6">
                  <p className="text-xs sm:text-sm text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/sign-up')}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl border border-gray-700/50 shadow-2xl p-8 h-full backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-600/50">
                    <Bot className="h-8 w-8 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Flixby AI Assistant
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  <p className="text-gray-300 text-lg">
                    Sign in to access your AI assistant dashboard and manage your settings.
                  </p>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="User Testimonial"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-white">Sarah Johnson</h4>
                        <p className="text-sm text-gray-400">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic">
                      "Flixby has completely transformed how we handle customer inquiries. Our response time has decreased by 80% and customer satisfaction is at an all-time high."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Benefits Section (shown only on mobile) */}
            <div className="lg:hidden bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl border border-gray-700/50 shadow-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-600/50">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Flixby AI Assistant
                </h2>
              </div>

              <div className="space-y-4 mb-4">
                <div className="space-y-3">
                  {benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;