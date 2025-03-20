import React from 'react';
import { Phone, Calendar, Clock, MessageSquare, Headphones, Star, Award, Settings, DollarSign, ChevronRight, Users, Bookmark, CheckCircle, Activity, Stethoscope, Heart, ShieldCheck } from 'lucide-react';

function HealthcareUseCases() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-teal-900/30 via-cyan-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-blue-900/30 via-teal-800/20 to-transparent rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-teal-500/10 rounded-full mb-4 border border-teal-500/20">
              <Stethoscope className="h-4 w-4 text-teal-400 mr-2" />
              <span className="text-sm text-teal-300 font-medium">Healthcare Industry</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                AI Voice Assistant for Healthcare
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enhance patient care and operational efficiency with Flixby's AI voice assistant, 
              managing appointments, answering queries, and reducing administrative burden.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-lg shadow-lg shadow-teal-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Transforms Healthcare Operations</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our AI assistant helps healthcare providers deliver better patient care while optimizing administrative processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-5 group-hover:bg-teal-900/60 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Streamlined Appointment Management</h3>
                <p className="text-gray-400 mb-4">
                  Reduce no-shows and optimize scheduling with automated booking, confirmation, and reminders for patient appointments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Integrates with EHR/EMR systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Reduces scheduling conflicts</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-5 group-hover:bg-teal-900/60 transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Patient Engagement & Support</h3>
                <p className="text-gray-400 mb-4">
                  Answer common patient questions, provide pre-visit instructions, and follow up on care plans to improve patient satisfaction.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">24/7 patient assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">HIPAA-compliant communications</span>
                  </li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:bg-gray-800/60 group">
                <div className="w-12 h-12 rounded-lg bg-teal-900/40 flex items-center justify-center mb-5 group-hover:bg-teal-900/60 transition-all duration-300">
                  <ShieldCheck className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure Administrative Support</h3>
                <p className="text-gray-400 mb-4">
                  Safely handle insurance verification, billing inquiries, and routine administrative tasks while maintaining compliance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Secure data handling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Administrative time savings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="mb-20 py-12 px-6 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Real Results for Healthcare Providers</h2>
              <p className="text-gray-400">See how Flixby is transforming patient care and practice management</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">72%</div>
                <p className="text-gray-300">Reduction in missed appointments</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">8.4hrs</div>
                <p className="text-gray-300">Weekly admin time saved per provider</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">34%</div>
                <p className="text-gray-300">Increase in patient satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">18%</div>
                <p className="text-gray-300">Increase in appointment capacity</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How Flixby Works for Healthcare</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A secure, compliant solution designed for the unique needs of healthcare providers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">HIPAA-Compliant Integration</h3>
                <p className="text-gray-400 mb-4">
                  We securely connect with your existing EHR/EMR systems, practice management software, and telephony with strict adherence to privacy standards.
                </p>
                <div className="mt-4 flex items-center text-sm text-teal-300">
                  <span>Secure, compliant implementation</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Customized Healthcare Solution</h3>
                <p className="text-gray-400 mb-4">
                  We tailor your AI assistant to your specific specialty, practice protocols, and patient communication preferences.
                </p>
                <div className="mt-4 flex items-center text-sm text-teal-300">
                  <span>Specialty-specific configuration</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Continuous Improvement</h3>
                <p className="text-gray-400 mb-4">
                  Your AI assistant learns from interactions to improve response accuracy and personalization while maintaining HIPAA compliance.
                </p>
                <div className="mt-4 flex items-center text-sm text-teal-300">
                  <span>Adaptive learning within compliance framework</span>
                  <CheckCircle className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl border border-teal-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2880&q=80" 
                    alt="Medical Clinic" 
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
                    "Flixby has transformed our practice operations. Patient no-shows have decreased dramatically, 
                    and our staff now spends less time on the phone and more time providing direct patient care. 
                    The secure handling of patient information gives us peace of mind with regulatory compliance."
                  </blockquote>
                  <div>
                    <h4 className="text-white font-medium">Dr. Robert Chen</h4>
                    <p className="text-gray-400 text-sm">Medical Director, Northside Family Practice</p>
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
                See how healthcare providers are using Flixby to enhance patient care and streamline operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Use Case 1 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80" 
                    alt="Multi-specialty Clinic" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Multi-specialty Medical Group</h3>
                  <p className="text-gray-400 mb-4">
                    A large medical group with 15 physicians across 5 specialties implemented Flixby to standardize their patient communication.
                    The AI assistant now handles appointment scheduling across departments, provides specialty-specific pre-visit instructions,
                    and manages routine follow-ups, reducing administrative overhead by 32% and improving cross-specialty coordination.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Cross-specialty Scheduling</span>
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Pre-visit Instructions</span>
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Coordination of Care</span>
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                    alt="Dental Practice" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Dental Practice Network</h3>
                  <p className="text-gray-400 mb-4">
                    A network of dental practices implemented Flixby to manage patient anxiety and improve appointment attendance.
                    The AI provides detailed procedure information, answers insurance questions, and sends procedure-specific reminders.
                    The practice saw a 68% reduction in last-minute cancellations and a 24% increase in treatment plan acceptance.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Procedure Information</span>
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Insurance Verification</span>
                    <span className="px-3 py-1 bg-teal-900/30 rounded-full text-xs text-teal-300">Anxiety Reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Security Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Compliance & Security</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Flixby takes healthcare data security and regulatory compliance seriously
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <ShieldCheck className="h-10 w-10 text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">HIPAA Compliant</h3>
                <p className="text-gray-400">
                  Our platform is fully HIPAA compliant with end-to-end encryption, BAA agreements, and secure data handling protocols.
                </p>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <Users className="h-10 w-10 text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Role-Based Access</h3>
                <p className="text-gray-400">
                  Granular access controls ensure only authorized staff can access specific patient information and AI functionality.
                </p>
              </div>
              
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <Activity className="h-10 w-10 text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Compliance Auditing</h3>
                <p className="text-gray-400">
                  Comprehensive audit trails and monitoring help maintain regulatory compliance and identify potential security issues.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-2xl border border-teal-500/20 p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Patient Care?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Join healthcare providers already using Flixby to deliver exceptional patient experiences,
              reduce administrative burden, and improve practice efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-lg shadow-lg shadow-teal-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
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

export default HealthcareUseCases; 