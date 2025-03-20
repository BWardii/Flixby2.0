import React from 'react';
import { Phone, Calendar, Clock, MessageSquare, Headphones, Star, Award, Settings, DollarSign, ChevronRight, Users, Bookmark, CheckCircle, BedDouble, Globe, Sunset } from 'lucide-react';

function HotelsResortsUseCases() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-blue-900/30 via-cyan-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-purple-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/10 rounded-full mb-4 border border-blue-500/20">
              <BedDouble className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300 font-medium">Hospitality Industry</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Voice Assistant for Hotels & Resorts
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deliver 24/7 world-class guest service with Flixby's AI voice assistant, 
              handling bookings, inquiries, and requests across all time zones with personalized care.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Transforms Hotel Operations</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our AI assistant handles guest communications around the clock, enhancing the guest experience while optimizing your staff resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-blue-900/40 flex items-center justify-center mb-5 group-hover:bg-blue-900/60 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">24/7 Reservation Management</h3>
                <p className="text-gray-400 mb-4">
                  Process bookings, modifications, and cancellations around the clock in any time zone, maximizing occupancy rates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Integrates with your booking system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Handles international guest inquiries</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-blue-900/40 flex items-center justify-center mb-5 group-hover:bg-blue-900/60 transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Personalized Concierge Service</h3>
                <p className="text-gray-400 mb-4">
                  Answer questions about amenities, local attractions, and provide personalized recommendations for each guest.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Local dining and activity suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Special arrangements for celebrations</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-blue-900/40 flex items-center justify-center mb-5 group-hover:bg-blue-900/60 transition-all duration-300">
                  <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Multi-lingual Support</h3>
                <p className="text-gray-400 mb-4">
                  Communicate with international guests in their preferred language, enhancing the guest experience for travelers from around the world.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Support in multiple languages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Cultural nuances and adaptability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="mb-20 py-12 px-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Real Results for Hotels & Resorts</h2>
              <p className="text-gray-400">See how Flixby is transforming hospitality operations</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">42%</div>
                <p className="text-gray-300">Reduction in front desk call volume</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">28%</div>
                <p className="text-gray-300">Increase in direct bookings</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">93%</div>
                <p className="text-gray-300">Guest satisfaction with AI interactions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">15%</div>
                <p className="text-gray-300">Increase in premium upgrades</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Works for Hotels & Resorts</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A frictionless experience from implementation to daily operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Seamless Integration</h3>
                <p className="text-gray-400 mb-4">
                  We connect with your existing Property Management System (PMS) and telephony infrastructure with minimal disruption to your operations.
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-300">
                  <span>Works with all major PMS systems</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Brand Customization</h3>
                <p className="text-gray-400 mb-4">
                  Tailor your AI assistant's voice, tone, and responses to align perfectly with your brand's service style and standards.
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-300">
                  <span>Reflects your unique hospitality approach</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Insights & Optimization</h3>
                <p className="text-gray-400 mb-4">
                  Gain valuable insights into guest preferences and behavior with detailed analytics, helping you refine services and boost revenue.
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-300">
                  <span>Data-driven hospitality management</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Luxury Hotel" 
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
                    "Implementing Flixby has been transformative for our resort chain. We've significantly reduced call wait times, 
                    increased direct bookings, and our front desk staff now has more time to provide personalized attention to in-house guests. 
                    The ROI has been fantastic."
                  </blockquote>
                  <div>
                    <h4 className="text-white font-medium">Sarah Johnson</h4>
                    <p className="text-gray-400 text-sm">Director of Operations, Azure Bay Resorts</p>
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
                See how hotels and resorts are using Flixby to enhance their guest experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Use Case 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Luxury Hotel" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Boutique Luxury Hotel</h3>
                  <p className="text-gray-400 mb-4">
                    A boutique hotel in Miami implemented Flixby to maintain their high-touch service standards while managing staff costs.
                    Their AI assistant now handles 70% of pre-arrival inquiries, processes room upgrade requests, and provides personalized
                    local recommendations that have increased guest satisfaction scores by 18%.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">Room Upgrades</span>
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">Personalized Recommendations</span>
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">Pre-arrival Communication</span>
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Resort Chain" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">International Resort Chain</h3>
                  <p className="text-gray-400 mb-4">
                    A global resort chain with 28 properties implemented Flixby to standardize guest communication across different time zones and languages.
                    The AI handles booking inquiries 24/7 in 12 languages, resulting in a 35% increase in direct bookings and significant reduction in OTA commission fees.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">Multi-lingual Support</span>
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">24/7 Availability</span>
                    <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">Direct Booking Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-500/20 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Guest Experience?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the hotels and resorts already using Flixby to deliver exceptional 24/7 service,
              increase direct bookings, and optimize staff resources for a superior guest experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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

export default HotelsResortsUseCases; 