import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, AlertCircle, Loader2, User, CheckCircle, Shield, Star, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { signInWithGoogle } from '../lib/auth';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        navigate('/my-assistant');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const testimonials = [
    {
      quote: "Flixby has completely transformed how we handle incoming calls.",
      author: "Sarah J., Marketing Director",
      company: "TechFusion"
    },
    {
      quote: "Our customer satisfaction scores increased by 35% within the first month.",
      author: "Michael L., CEO",
      company: "RetailPro"
    }
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
      <div className="flex-1 relative z-10 pt-20 pb-12 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 mx-auto">
          <div className="text-center mb-8">
            <img 
              src="/flixby-logo.png" 
              alt="Flixby Logo" 
              className="w-[180px] h-auto mx-auto mb-4"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Start Your AI Journey Today
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Create your free account and set up your AI assistant in minutes
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Form Section - 3 columns */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <UserPlus className="mr-3 h-6 w-6 text-blue-400" />
                    Create your account
                  </h2>

                  <form onSubmit={handleEmailSignUp} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                          className="block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Create a password (min. 6 characters)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-400 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
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
                            <span>Creating account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Free Account</span>
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
                        onClick={handleGoogleSignUp}
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
                            <span>Sign up with Google</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <button
                          onClick={() => navigate('/sign-in')}
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span>Enterprise-grade security</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span>No credit card required</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Benefits - 2 columns */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 relative">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="relative h-full flex flex-col p-8 lg:p-12">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                      After sign-up, you will:
                    </h3>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Create your AI assistant</h4>
                          <p className="text-sm text-gray-300">Customize your assistant in minutes</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Select voice & personality</h4>
                          <p className="text-sm text-gray-300">Choose how your AI represents your brand</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Train with business info</h4>
                          <p className="text-sm text-gray-300">Your AI will learn about your services</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Launch your 24/7 assistant</h4>
                          <p className="text-sm text-gray-300">Never miss another call</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-2" />
                      Trusted by businesses worldwide
                    </h3>
                    
                    <div className="space-y-4">
                      {testimonials.map((item, index) => (
                        <div key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                          <p className="text-gray-300 text-sm italic mb-3">"{item.quote}"</p>
                          <div className="text-xs text-gray-400">
                            <p className="font-medium text-gray-300">{item.author}</p>
                            <p>{item.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;