import React from 'react';
import { Phone, Calendar, Clock, MessageSquare, Headphones, Star, Award, Settings, DollarSign, ChevronRight, Users, Bookmark, CheckCircle, Smile, Sparkles, Heart } from 'lucide-react';

function BeautyWellnessUseCases() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-purple-900/30 via-fuchsia-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-pink-900/30 via-purple-800/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-purple-500/10 rounded-full mb-4 border border-purple-500/20">
              <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300 font-medium">Beauty & Wellness Industry</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Voice Assistant for Beauty & Wellness
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Elevate your client experience with Flixby's AI voice assistant, managing appointments, 
              consultation requests, and product inquiries—even during your busiest hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                <span>Get Started</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
              <button className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 text-white font-medium rounded-lg border border-gray-700 flex items-center justify-center transition-all duration-300">
                <Headphones className="h-5 w-5 mr-2" />
                <span>Request Demo</span>
              </button>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Transforms Beauty & Wellness Businesses</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our AI assistant handles client communications seamlessly, allowing you to focus on providing exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-5 group-hover:bg-purple-900/60 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Appointment Scheduling</h3>
                <p className="text-gray-400 mb-4">
                  Handle appointment bookings, modifications, and cancellations with ease, reducing no-shows and maximizing your schedule.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Integrates with your booking software</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Sends automated reminders</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-5 group-hover:bg-purple-900/60 transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Personalized Client Interactions</h3>
                <p className="text-gray-400 mb-4">
                  Answer common questions about services, products, and pricing while maintaining a personal touch that aligns with your brand.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Recommend services based on client history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Provide detailed service information</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-5 group-hover:bg-purple-900/60 transition-all duration-300">
                  <Heart className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Enhanced Client Loyalty</h3>
                <p className="text-gray-400 mb-4">
                  Build stronger relationships with clients through consistent communication and personalized follow-ups after treatments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Follow-up care instructions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Special offers for returning clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="mb-20 py-12 px-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Real Results for Beauty & Wellness Businesses</h2>
              <p className="text-gray-400">See how Flixby is transforming the industry</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">67%</div>
                <p className="text-gray-300">Reduction in missed appointments</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">32%</div>
                <p className="text-gray-300">Increase in booking conversions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
                <p className="text-gray-300">Availability for client inquiries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">22%</div>
                <p className="text-gray-300">Increase in retail product sales</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Works for Beauty & Wellness</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A seamless experience for both you and your clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Easy Integration</h3>
                <p className="text-gray-400 mb-4">
                  We connect with your existing scheduling software and client management systems with minimal disruption to your day-to-day operations.
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-300">
                  <span>Compatible with popular booking platforms</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Personalized Setup</h3>
                <p className="text-gray-400 mb-4">
                  We customize your AI assistant to match your brand voice, service offerings, and client communication preferences.
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-300">
                  <span>Tailored to your unique business style</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Actionable Insights</h3>
                <p className="text-gray-400 mb-4">
                  Gain valuable data on booking patterns, popular services, and client preferences to optimize your business strategy.
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-300">
                  <span>Make data-driven business decisions</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80" 
                    alt="Luxury Spa" 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <blockquote className="text-lg text-gray-200 italic mb-4">
                    "Flixby has transformed how we handle client bookings and inquiries. Our estheticians and therapists can now 
                    focus on providing treatments rather than answering phones. We've seen a significant reduction in no-shows and
                    an increase in retail product sales through personalized recommendations."
                  </blockquote>
                  <div>
                    <h4 className="text-white font-medium">Michelle Parker</h4>
                    <p className="text-gray-400 text-sm">Owner, Serene Day Spa & Wellness Center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case Examples */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Real-World Applications</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See how beauty and wellness businesses are using Flixby to enhance their client experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Use Case 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="High-end Salon" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">High-end Hair Salon</h3>
                  <p className="text-gray-400 mb-4">
                    A luxury hair salon with 12 stylists implemented Flixby to manage their complex booking system based on stylist specialties.
                    Their AI assistant now handles appointment scheduling, color consultation inquiries, and product recommendations,
                    resulting in a 35% reduction in front desk calls and allowing staff to focus on in-salon client experiences.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Stylist Matching</span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Service Consultations</span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Product Recommendations</span>
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2884&q=80" 
                    alt="Wellness Center" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Multi-location Spa Chain</h3>
                  <p className="text-gray-400 mb-4">
                    A wellness spa chain with 5 locations implemented Flixby to create a centralized booking system with location-specific
                    treatment availability. The AI handles new client intake, recommends appropriate treatments based on client needs,
                    and manages follow-up appointment scheduling, resulting in a 28% increase in client retention.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Multi-location Management</span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Treatment Matching</span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300">Client Retention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Client Experience?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the beauty and wellness businesses already using Flixby to deliver exceptional client service,
              reduce administrative burden, and grow their client base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                <span>Schedule a Demo</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
              <button className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 text-white font-medium rounded-lg border border-gray-700 flex items-center justify-center transition-all duration-300">
                <span>View Pricing Plans</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeautyWellnessUseCases; 