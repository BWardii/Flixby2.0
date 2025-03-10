import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Cpu, Bot, X, Phone, Clock, Users, CheckCircle, MessageSquare, Calendar, Building2, Utensils, Briefcase, Plane, MicOff, Mic, Mail, Building, Info } from 'lucide-react';
import AIAssistant from '../components/AIAssistant';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface DemoFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  newsletter: boolean;
  demoDate: string;
}

function Home() {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    newsletter: false,
    demoDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://hook.eu2.make.com/1lvukqh4rzbtl04x155vxtr36cr27ft1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          message: formData.message,
          email: formData.email,
          newsletter: formData.newsletter,
          demoDate: formData.demoDate,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send data to webhook');
      }

      setSuccess('Thank you for your interest! We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        newsletter: false,
        demoDate: '',
      });

      setTimeout(() => {
        setShowDemoModal(false);
        setSuccess(null);
      }, 2000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const features = [
    {
      title: "Business Oriented",
      description: "Receives information from your systems and updates them with conversation outcomes.",
      image: "/image1.jpg",
      benefits: [
        "24/7 availability, no volume limit",
        "Quick setup & integration",
        "Low maintenance, continuous learning",
        "Consistent response quality",
        "Contact details validation"
      ]
    },
    {
      title: "Human Conversation",
      description: "Conduct human conversations to drive better customer experience, addressing the unique challenges of phone communication.",
      image: "/image2.jpg",
      benefits: [
        "Natural, engaging conversations",
        "State-of-the-art voice models",
        "Low latency",
        "Listens when interrupted and responds accordingly",
        "Ignores background conversations and noises"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Building2 className="h-8 w-8 text-purple-400" />,
      title: "Enterprise Solutions",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      conversation: {
        user: "How can Flixby help our enterprise?",
        ai: "Flixby's AI receptionist can automate customer support, streamline operations, and provide 24/7 service across all departments. Would you like to learn more about our enterprise solutions?"
      },
      benefit: "Transform enterprise communication with AI"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "Customer Service",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      conversation: {
        user: "Can you help with my account settings?",
        ai: "Of course! I can guide you through your account settings. Would you like to update your preferences or security settings first?"
      },
      benefit: "Provide instant, personalized customer support"
    },
    {
      icon: <Zap className="h-8 w-8 text-green-400" />,
      title: "Smart Automation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      conversation: {
        user: "How does Flixby automate workflows?",
        ai: "Flixby integrates with your existing systems to automate repetitive tasks, schedule meetings, and manage projects. Would you like to see a demo of our workflow automation?"
      },
      benefit: "Streamline operations with intelligent automation"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] -left-48 -top-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-[600px] h-[600px] -right-48 -bottom-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute w-[900px] h-[900px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div className="inline-block">
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-800/50 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-gray-300">24/7 AI Receptionist</span>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-2">
                <img 
                  src="/flixby-logo.png" 
                  alt="Flixby Logo" 
                  className="w-[300px] max-w-full h-auto"
                />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  AI Phone Receptionist for Your Business
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Let AI handle your business calls 24/7. Book appointments, answer questions, and never miss an opportunity.
                </p>
                
                <div className="flex items-center space-x-6 justify-center lg:justify-start">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">24/7 Availability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Human-like Conversations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">1-min Setup</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <button 
                  onClick={() => navigate('/sign-up')}
                  className="group bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300 flex items-center transform hover:scale-105"
                >
                  Create an Agent in 30 seconds
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => setShowDemoModal(true)}
                  className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center transform hover:scale-105"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="relative flex justify-center items-center">
              {/* Label above phone */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Try Our Sample Demo
                </span>
              </div>

              {/* Phone Frame */}
              <div 
                className="relative w-[320px] h-[650px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 cursor-pointer"
                onClick={() => setShowAIAssistant(true)}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                
                {/* Status Bar */}
                <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center text-xs text-gray-400">
                  <span>9:41</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                    <span>Ready to Talk</span>
                  </div>
                </div>

                {/* Call Interface */}
                <div className="relative h-full w-full bg-gradient-to-b from-gray-900 to-gray-800 p-6">
                  {/* Contact Info */}
                  <div className="mt-12 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Sarah - AI Receptionist"
                        className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-gray-800"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-4 border-gray-800"></div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-1">Sarah</h3>
                    <p className="text-gray-400 text-sm">AI Receptionist</p>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-300 mb-6">Click to start a conversation</p>
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Screen Reflections */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side - Information */}
              <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-l-2xl">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                  The phone doesn't sleep,<br />so why should your business?
                </h2>
                
                <div className="space-y-6">
                  <p className="text-xl text-gray-300">
                    Your phone calls, answered.
                  </p>
                  
                  <p className="text-gray-400 leading-relaxed">
                    Our digital phone concierge allows you to answer questions, take reservations, 
                    book appointments and satisfy callers.
                  </p>

                  <div className="space-y-4 mt-8">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-white">100%</span>
                        <span className="text-sm text-gray-400">Calls Answered</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-white">80%</span>
                        <span className="text-sm text-gray-400">Handled Without Team Involvement</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-white">24/7</span>
                        <span className="text-sm text-gray-400">Availability</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-400">
                        Schedule a demo to see how Flixby can transform your business 
                        communications and provide round-the-clock customer service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    Request a Demo
                  </h3>
                  <p className="text-gray-400">
                    Experience the power of Flixby firsthand with a personalized demo
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Preferred Demo Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={formData.demoDate}
                        onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                        min={minDate}
                        max={maxDateStr}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-400">
                      Select a date between tomorrow and 3 months from now
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      placeholder="Tell us about your needs"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-purple-500 focus:ring-purple-500/50"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-300">
                      Keep me updated with news and offers
                    </label>
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-400">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-3 text-green-400">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Demo</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowAIAssistant(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-6">
              <LazyAIAssistant />
            </div>
          </div>
        </div>
      )}

      {/* As Seen On Section */}
      <section className="py-16 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xl text-gray-200 font-medium">As seen on</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            <img 
              src="/logos/therundown.png" 
              alt="The Rundown" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
            <img 
              src="/logos/scisworthy.png" 
              alt="SciSworthy" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
            <img 
              src="/logos/futuretools.png" 
              alt="Future Tools" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
            <img 
              src="/logos/futurepedia.png" 
              alt="Futurepedia" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
            <img 
              src="/logos/aiforthat.png" 
              alt="There's an AI for that" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
            <img 
              src="/logos/gpte.png" 
              alt="GPTE" 
              className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                See Flixby in Action
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Watch how easy it is to set up and use your AI phone receptionist
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
            <div className="aspect-w-16 aspect-h-9">
              <video
                className="w-full h-full object-cover"
                poster="/logos/Thumbnail.jpg"
                controls
                preload="none"
              >
                <source src="/logos/cursorful-video-1741568342150.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-25" style={{ 
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0, transparent 100%)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-block animate-float">
              <div className="flex items-center justify-center px-3 py-1 space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                <span className="px-2 py-1 text-[10px] font-medium bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">NEW</span>
                <span className="text-sm text-gray-300">AI-Powered Phone System</span>
              </div>
            </div>
            
            <h2 className="mt-8 text-5xl md:text-6xl font-bold tracking-tight">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                The Future of Business
              </span>
              <br />
              <span className="text-white">
                Communication is Here
              </span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Always Available */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 group">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-purple-500/20 to-transparent hover:from-purple-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-purple-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
                  
                    <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                      <span className="text-sm text-purple-400 font-medium">01</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">Always Available</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Never miss another call. Your AI receptionist works 24/7, handling customer inquiries with 
                      the same level of professionalism at 3 AM as at 3 PM.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        24/7 Service
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        Zero Wait Time
                      </span>
                    </div>
                  </div>
                </div>
                  </div>
                </div>

            {/* Feature 2: More than just an AI Receptionist */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 group">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-indigo-500/20 to-transparent hover:from-indigo-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-indigo-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="text-sm text-indigo-400 font-medium">02</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">More Than Just AI</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      A complete business solution that takes orders, books appointments, manages reservations, and handles customer inquiries with ease and precision.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Order Taking
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Appointments
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Reservations
                      </span>
                      </div>
                  </div>
                </div>
              </div>
                  </div>

            {/* Feature 3: Natural Conversations */}
            <div className="group">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-blue-500/20 to-transparent hover:from-blue-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-blue-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                      <span className="text-sm text-blue-400 font-medium">03</span>
              </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">Natural Conversations</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Advanced AI that understands context, nuance, and natural speech patterns, 
                      delivering human-like interactions that feel personal and engaging.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Context Aware
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Natural Speech
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm text-gray-400">Calls Answered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-400">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                1 min
              </div>
              <div className="text-sm text-gray-400">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                90%
              </div>
              <div className="text-sm text-gray-400">Cost Reduction</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <button 
              onClick={() => navigate('/sign-up')}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <p className="mt-4 text-sm text-gray-400">
              No credit card required · Set up in minutes · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-25" style={{ 
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0, transparent 100%)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block animate-float">
              <div className="flex items-center justify-center px-3 py-1 space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                <span className="px-2 py-1 text-[10px] font-medium bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">ROI</span>
                <span className="text-sm text-gray-300">Business Impact</span>
              </div>
            </div>
            
            <h2 className="mt-8 text-5xl md:text-6xl font-bold tracking-tight">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Measurable
              </span>
              <br />
              <span className="text-white">
                Business Results
              </span>
            </h2>
            
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">We handle the front desk,</span> so you can focus on what truly matters — growing your business.
            </p>
          </div>

          {/* Interactive Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Metric Card 1: Time Savings */}
            <div className="group col-span-1 md:col-span-1">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-blue-500/20 to-transparent hover:from-blue-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-blue-500/20 overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="px-2 py-1 text-xs font-medium bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">
                        TIME
                      </div>
                    </div>
                    
                    <div className="flex items-end mb-6">
                      <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">40+</span>
                      <span className="ml-2 text-xl text-blue-300 mb-2">hours</span>
                      </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">Saved Every Month</h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-6">
                      That's an entire work week back to your business. No more interruptions, missed calls, or appointment scheduling hassles.
                    </p>
                    
                    {/* Interactive element */}
                    <div className="flex items-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-300">Eliminate repetitive call handling</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-300">Automated appointment scheduling</span>
                    </div>
                  </div>
                </div>
                  </div>
                </div>

            {/* Metric Card 2: Cost Savings */}
            <div className="group col-span-1 md:col-span-1">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-green-500/20 to-transparent hover:from-green-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-green-500/20 overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="px-2 py-1 text-xs font-medium bg-green-500/20 rounded-full text-green-300 border border-green-500/30">
                        MONEY
                      </div>
                  </div>
                  
                    <div className="flex items-end mb-6">
                      <span className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">80%</span>
                      <span className="ml-2 text-xl text-green-300 mb-2">savings</span>
                  </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">Cost Reduction</h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Compared to a traditional receptionist, our AI solution delivers significant cost savings without sacrificing quality or professionalism.
                    </p>
                    
                    {/* Cost calculator */}
                    <div className="p-4 bg-gray-800/50 rounded-xl border border-green-500/20">
                      <p className="text-gray-300 text-sm mb-3">Annual Savings Estimate:</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Traditional Receptionist</span>
                        <span className="text-gray-300">£35,000</span>
                </div>
                      <div className="w-full h-1 bg-gray-700 my-2 rounded-full overflow-hidden">
                        <div className="w-[13%] h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">AI Receptionist</span>
                        <span className="text-green-400 font-semibold">£4,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Metric Card 3: Business Growth */}
            <div className="group col-span-1 md:col-span-1">
              <div className="h-full relative p-1 rounded-2xl transition-all duration-300 bg-gradient-to-b from-purple-500/20 to-transparent hover:from-purple-500/30">
                <div className="relative h-full p-8 bg-gray-900/90 rounded-xl border border-purple-500/20 overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="px-2 py-1 text-xs font-medium bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">
                        GROWTH
                      </div>
                    </div>
                    
                    <div className="flex items-end mb-6">
                      <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">27%</span>
                      <span className="ml-2 text-xl text-purple-300 mb-2">more</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4">Customer Capture</h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Never miss another opportunity. Capture every potential customer with 24/7 availability and instant, professional responses.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Missed Calls Without AI</span>
                        <span className="text-red-400">37%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-[37%] h-full bg-red-400/50 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-400 text-sm">Calls Handled With AI</span>
                        <span className="text-purple-400">100%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reinvestment Section */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 mb-16">
            <div className="relative p-8 md:p-12 bg-gray-900/90 rounded-xl border border-blue-500/20 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-emerald-500/5"></div>
              
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Reinvest in What Matters</h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Imagine what you could do with the time and money saved. With our AI Receptionist handling your front desk:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Focus on Customers</h4>
                        <p className="text-gray-400 text-sm">Spend more time developing meaningful client relationships</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
                        <Cpu className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Optimize Operations</h4>
                        <p className="text-gray-400 text-sm">Streamline your business processes and eliminate inefficiencies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Accelerate Growth</h4>
                        <p className="text-gray-400 text-sm">Invest in expansion and new business opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Enhance Quality</h4>
                        <p className="text-gray-400 text-sm">Deliver better products and services to your customers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-blue-500/10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white text-center mb-2">Your Business Deserves More</h4>
                  <p className="text-gray-400 text-center mb-4">
                    Stop managing phone calls and start managing growth
                  </p>
                  <button
                    onClick={() => navigate('/sign-up')}
                    className="mt-2 inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    Transform Your Business
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Today Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-25" style={{ 
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0, transparent 100%)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block animate-float mb-6">
              <div className="flex items-center justify-center px-3 py-1 space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                <span className="px-2 py-1 text-[10px] font-medium bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">START NOW</span>
                <span className="text-sm text-gray-300">Setup in 1 minute</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Get Started Today
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join the future of business communication. Set up your AI phone receptionist in minutes.
            </p>
          </div>
          
          {/* Form Card */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent">
            <div className="relative p-8 bg-gray-900/90 rounded-xl border border-purple-500/20 backdrop-blur-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Company Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* How did you hear about us Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    className="block w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-gray-900">Select an option</option>
                    <option value="search" className="bg-gray-900">Search Engine</option>
                    <option value="social" className="bg-gray-900">Social Media</option>
                    <option value="referral" className="bg-gray-900">Referral</option>
                    <option value="press" className="bg-gray-900">Press/Media</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <p className="mt-4 text-sm text-center text-gray-400">
                    No credit card required · Set up in minutes · Cancel anytime
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Lazy-loaded AIAssistant component that only initializes when rendered
const LazyAIAssistant = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
            AI Receptionist
          </h2>
          <p className="text-gray-300">Ready to start</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gray-800/50 flex items-center justify-center transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="AI Receptionist"
                className="w-40 h-40 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              disabled={true}
              className="p-4 rounded-full bg-gray-800/50 text-gray-500 cursor-not-allowed"
            >
              <Mic size={24} />
            </button>

            <button
              className="p-4 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30"
            >
              <Phone size={24} />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Click the phone button to start a conversation with the AI Receptionist</p>
        </div>
      </div>
    );
  }
  
  return <AIAssistant />;
};

export default Home;