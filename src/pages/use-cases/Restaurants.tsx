import React from 'react';
import { Phone, Calendar, Clock, MessageSquare, Headphones, Star, Award, Settings, DollarSign, ChevronRight, Users, Utensils, Bookmark, CheckCircle, RefreshCw } from 'lucide-react';

function RestaurantsUseCases() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-orange-900/30 via-red-800/20 to-transparent"></div>
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
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-orange-500/10 rounded-full mb-4 border border-orange-500/20">
              <Utensils className="h-4 w-4 text-orange-400 mr-2" />
              <span className="text-sm text-orange-300 font-medium">Restaurant Industry</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                AI Voice Assistant for Restaurants
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your restaurant's customer service with Flixby's AI voice assistant, 
              handling reservations, inquiries, and special requests 24/7 with the warmth of a human host.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Elevates Your Restaurant</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our AI assistant handles the front-of-house communication so your staff can focus on delivering exceptional dining experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-orange-900/40 flex items-center justify-center mb-5 group-hover:bg-orange-900/60 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Reservation Management</h3>
                <p className="text-gray-400 mb-4">
                  Effortlessly handle table bookings, modifications, and cancellations 24/7, reducing no-shows and maximizing occupancy.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Automatic confirmation and reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Smart table assignments based on party size</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-orange-900/40 flex items-center justify-center mb-5 group-hover:bg-orange-900/60 transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Menu & Special Requests</h3>
                <p className="text-gray-400 mb-4">
                  Answer detailed questions about your menu, ingredients, allergens, and accommodate special dietary requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Detailed allergen information</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Special occasion arrangements</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-orange-900/40 flex items-center justify-center mb-5 group-hover:bg-orange-900/60 transition-all duration-300">
                  <Phone className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Never Miss a Call</h3>
                <p className="text-gray-400 mb-4">
                  Handle peak-time call volumes with ease, ensuring every customer inquiry is addressed promptly and professionally.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Multiple simultaneous conversations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Seamless human handoff for complex queries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="mb-20 py-12 px-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Real Results for Restaurants</h2>
              <p className="text-gray-400">See how Flixby is transforming restaurant operations</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">85%</div>
                <p className="text-gray-300">Reduction in missed reservation calls</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">24/7</div>
                <p className="text-gray-300">Availability for customer inquiries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">30%</div>
                <p className="text-gray-300">Increase in reservation bookings</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">20+</div>
                <p className="text-gray-300">Hours saved on phone calls weekly</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Works for Restaurants</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A seamless experience from setup to daily operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Quick Setup</h3>
                <p className="text-gray-400 mb-4">
                  We integrate with your existing phone system and reservation platforms. Setup takes less than a day with no disruption to your operations.
                </p>
                <div className="mt-4 flex items-center text-sm text-orange-300">
                  <span>No technical skills required</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Personalization</h3>
                <p className="text-gray-400 mb-4">
                  Customize your AI assistant's voice, personality, and responses to match your restaurant's brand and style of service.
                </p>
                <div className="mt-4 flex items-center text-sm text-orange-300">
                  <span>Sounds like your restaurant's personality</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Continuous Improvement</h3>
                <p className="text-gray-400 mb-4">
                  The AI learns from each interaction to better serve your customers, with detailed analytics to help optimize your operations.
                </p>
                <div className="mt-4 flex items-center text-sm text-orange-300">
                  <span>Gets better with every call</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Restaurant Interior" 
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
                    "Flixby has transformed how we handle reservations. Our staff can focus on providing excellent service rather than being tied to the phone. 
                    The AI is so natural that most customers don't even realize they're speaking with an assistant."
                  </blockquote>
                  <div>
                    <h4 className="text-white font-medium">Marco Rossi</h4>
                    <p className="text-gray-400 text-sm">Owner, Bella Cucina Restaurant</p>
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
                See how restaurants are using Flixby to enhance their operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Use Case 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Fine Dining Restaurant" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Fine Dining Restaurant</h3>
                  <p className="text-gray-400 mb-4">
                    An upscale restaurant in New York implemented Flixby to handle their high volume of reservation requests, 
                    special occasion inquiries, and detailed menu questions. The AI assistant now manages 90% of incoming calls, 
                    allowing the maître d' and staff to focus entirely on in-person guest experiences.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Reservations</span>
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Special Occasions</span>
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Menu Inquiries</span>
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Casual Dining Chain" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Casual Dining Chain</h3>
                  <p className="text-gray-400 mb-4">
                    A regional chain with 12 locations implemented Flixby to standardize their customer service experience 
                    across all venues. The AI provides consistent information about each location's hours, specials, and 
                    availability, while automatically routing takeout orders to the correct location.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Multiple Locations</span>
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Takeout Orders</span>
                    <span className="px-3 py-1 bg-orange-900/30 rounded-full text-xs text-orange-300">Location-Specific Info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/20 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Restaurant's Customer Experience?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the restaurants already using Flixby to provide exceptional service, 
              increase reservations, and free up staff to focus on creating memorable dining experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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

export default RestaurantsUseCases; 