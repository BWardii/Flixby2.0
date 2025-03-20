import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, BedDouble, Sparkles, Stethoscope, Building, Briefcase, ChevronRight, BarChart3, Users, Globe, ShieldCheck } from 'lucide-react';

function UseCases() {
  const navigate = useNavigate();

  const industryCards = [
    {
      id: 'restaurants',
      title: 'Restaurants',
      icon: <UtensilsCrossed className="h-6 w-6 text-orange-400" />,
      description: 'Handle reservations, answer menu questions, and process takeout orders 24/7 without missing a call.',
      color: 'from-orange-400 to-red-400',
      bgLight: 'bg-orange-500/10',
      bgDark: 'bg-orange-900/40',
      border: 'border-orange-500/20',
      path: '/use-cases/restaurants'
    },
    {
      id: 'hotels',
      title: 'Hotels & Resorts',
      icon: <BedDouble className="h-6 w-6 text-blue-400" />,
      description: 'Manage bookings, answer guest inquiries, and provide concierge services across all time zones.',
      color: 'from-blue-400 to-cyan-400',
      bgLight: 'bg-blue-500/10',
      bgDark: 'bg-blue-900/40',
      border: 'border-blue-500/20',
      path: '/use-cases/hotels-resorts'
    },
    {
      id: 'beauty',
      title: 'Beauty & Wellness',
      icon: <Sparkles className="h-6 w-6 text-purple-400" />,
      description: 'Schedule appointments, answer service questions, and provide follow-up care instructions.',
      color: 'from-purple-400 to-pink-400',
      bgLight: 'bg-purple-500/10',
      bgDark: 'bg-purple-900/40',
      border: 'border-purple-500/20',
      path: '/use-cases/beauty-wellness'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      icon: <Stethoscope className="h-6 w-6 text-teal-400" />,
      description: 'Manage patient appointments, answer inquiries, and provide pre and post-visit instructions securely.',
      color: 'from-teal-400 to-cyan-400',
      bgLight: 'bg-teal-500/10',
      bgDark: 'bg-teal-900/40',
      border: 'border-teal-500/20',
      path: '/use-cases/healthcare'
    },
    {
      id: 'property',
      title: 'Real Estate & Property',
      icon: <Building className="h-6 w-6 text-emerald-400" />,
      description: 'Handle property inquiries, schedule viewings, and answer common questions about listings.',
      color: 'from-emerald-400 to-green-400',
      bgLight: 'bg-emerald-500/10',
      bgDark: 'bg-emerald-900/40',
      border: 'border-emerald-500/20',
      path: '#'
    },
    {
      id: 'professional',
      title: 'Professional Services',
      icon: <Briefcase className="h-6 w-6 text-amber-400" />,
      description: 'Book consultations, answer client questions, and provide information about your services.',
      color: 'from-amber-400 to-yellow-400',
      bgLight: 'bg-amber-500/10',
      bgDark: 'bg-amber-900/40',
      border: 'border-amber-500/20',
      path: '#'
    },
  ];

  const handleCardClick = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-indigo-900/30 via-blue-800/20 to-transparent"></div>
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
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-indigo-500/10 rounded-full mb-4 border border-indigo-500/20">
              <Users className="h-4 w-4 text-indigo-400 mr-2" />
              <span className="text-sm text-indigo-300 font-medium">Industry Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Flixby for Every Industry
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how Flixby's AI voice assistant is transforming customer service and operations
              across diverse industries with tailored solutions.
            </p>
          </div>

          {/* Industry Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {industryCards.map((card) => (
              <div 
                key={card.id}
                className={`bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border ${card.border} hover:border-opacity-50 transition-all duration-300 hover:bg-gray-800/60 cursor-pointer transform hover:-translate-y-1`}
                onClick={() => handleCardClick(card.path)}
              >
                <div className={`w-12 h-12 rounded-lg ${card.bgDark} flex items-center justify-center mb-5`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 mb-5">{card.description}</p>
                <div className="flex items-center mt-auto">
                  <span className={`text-sm bg-gradient-to-r ${card.color} bg-clip-text text-transparent font-medium`}>
                    Explore {card.title} Solutions
                  </span>
                  <ChevronRight className={`h-4 w-4 ml-1 text-${card.color.split('-')[1]}-400`} />
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Industries Choose Flixby</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Across all sectors, businesses are discovering the competitive advantages of Flixby's AI voice assistant technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <BarChart3 className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Increased Efficiency</h3>
                <p className="text-gray-400">
                  Reduce operational costs and free up staff time by automating routine inquiries and processes, allowing your team to focus on high-value activities.
                </p>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <Globe className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">24/7 Availability</h3>
                <p className="text-gray-400">
                  Never miss an opportunity with around-the-clock service that handles customer interactions even outside of business hours and across time zones.
                </p>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <ShieldCheck className="h-10 w-10 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Consistent Quality</h3>
                <p className="text-gray-400">
                  Ensure every customer interaction meets your standards with an AI assistant that delivers reliable, accurate information with a consistent brand voice.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-2xl border border-indigo-500/20 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the businesses already using Flixby to enhance customer experiences, streamline operations, and gain a competitive edge in your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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

export default UseCases; 