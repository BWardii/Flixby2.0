import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  ChevronDown, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  HelpCircle
} from 'lucide-react';

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For now, just simulate a successful submission
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Contact methods
  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8 text-blue-400" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      value: 'Hello@Flixby.io',
      action: 'mailto:Hello@Flixby.io',
      isPrimary: true
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: 'How quickly can I expect a response to my inquiry?',
      answer: 'We typically respond to all email inquiries within 24 business hours.'
    },
    {
      question: 'What information should I include when reporting an issue?',
      answer: 'To help us resolve your issue more efficiently, please include your account email, a detailed description of the problem, any error messages you received, and steps to reproduce the issue. Screenshots or screen recordings are also very helpful.'
    },
    {
      question: 'Do you offer support outside of business hours?',
      answer: 'While our standard support hours are Monday to Friday, 9AM-5PM EST, premium plan subscribers have access to extended support hours and priority email response times.'
    },
    {
      question: 'How do I request a feature or suggest an improvement?',
      answer: 'We welcome feature requests and suggestions! Please email us with subject line "Feature Request" and include a detailed description of your idea and how it would benefit your workflow.'
    },
    {
      question: 'What if I need to cancel or change my subscription?',
      answer: 'You can manage your subscription from your account dashboard. If you need assistance, email us with your account details and we\'ll help you make the necessary changes.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-blue-900/30 via-purple-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-green-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
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
              <MessageSquare className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300 font-medium">Get Support</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                We&apos;re Here to Help
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions, feedback, or need assistance? Our team is ready to provide the support you need.
            </p>
          </div>

          {/* Contact Methods Section */}
          <div className="max-w-md mx-auto mb-20">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 ring-1 ring-blue-500/20 transition-all duration-300 hover:bg-gray-800/60 hover:-translate-y-1 cursor-pointer"
                onClick={() => method.action ? window.open(method.action) : null}
              >
                <div className="w-16 h-16 rounded-lg bg-blue-900/40 flex items-center justify-center mb-5">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-4">{method.description}</p>
                <div className="font-semibold text-lg text-blue-400">
                  {method.value}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form and FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-6 py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Report a Bug">Report a Bug</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 flex items-center">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mr-2" />
                      <p className="text-sm">{submitError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>.
                    For faster support, email us directly at <a href="mailto:Hello@Flixby.io" className="text-blue-400 hover:text-blue-300">Hello@Flixby.io</a>
                  </p>
                </form>
              )}
            </div>
            
            {/* FAQ Section */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle className="h-6 w-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-700/50 rounded-lg overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full px-5 py-4 text-left focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium text-white">{item.question}</span>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                          openFaqIndex === index ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaqIndex === index ? 'max-h-64' : 'max-h-0'
                      }`}
                    >
                      <div className="px-5 py-4 bg-gray-700/30 border-t border-gray-700/50">
                        <p className="text-gray-300">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-gray-400">
                  Still have questions? Contact us directly at{' '}
                  <a href="mailto:Hello@Flixby.io" className="text-blue-400 hover:text-blue-300 font-medium">
                    Hello@Flixby.io
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us Directly</h2>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Our team is dedicated to providing you with the best support possible. Feel free to reach out to us via email.
            </p>
            <a 
              href="mailto:Hello@Flixby.io"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Email Hello@Flixby.io</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 