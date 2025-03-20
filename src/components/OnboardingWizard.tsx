import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Bot, Volume2, Phone, Users, MessageSquare, FileText, CheckCircle, Loader2, Info, PartyPopper, UtensilsCrossed, Building, Stethoscope, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createAssistant } from '../lib/assistant';
import CryptoJS from 'crypto-js';
import AIAssistant from './AIAssistant';
import Confetti from 'react-confetti';

// Use the creation API key
const CREATION_API_KEY = 'b23dd722-a84d-4bb5-8f8d-463625277d41';

interface FormData {
  // Step 1
  companyName: string;
  phoneNumber: string;
  
  // Step 2
  businessDescription: string;
  targetCustomers: string;
  
  // Step 3
  greetingPhrase: string;
  voiceId: string;
  
  // Step 4
  additionalDetails: string;
}

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    phoneNumber: '',
    businessDescription: '',
    targetCustomers: '',
    greetingPhrase: '',
    voiceId: 'jennifer',
    additionalDetails: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdAssistantId, setCreatedAssistantId] = useState<string | null>(null);
  const totalSteps = 5; // Now includes a test step

  // Industry templates for step 4
  const industryTemplates = {
    restaurant: `Business Hours: {{Monday-Friday: 11:00 AM - 10:00 PM, Saturday-Sunday: 10:00 AM - 11:00 PM}}
Types of Cuisine: {{We specialize in [TYPE OF CUISINE] with [SIGNATURE COOKING STYLES]}}
Popular Dishes: {{Our signature dishes include [DISH 1], [DISH 2], and [DISH 3]}}
Reservations: We accept reservations up to {{X WEEKS/DAYS}} in advance for parties of any size.
Special Accommodations: We offer {{vegetarian, vegan, gluten-free}} options. We can accommodate food allergies with advance notice.
Delivery: We offer delivery through {{DELIVERY SERVICES}} within a {{X-MILE}} radius.
Catering: We provide catering services for events with at least {{X HOURS/DAYS}} notice.
Happy Hour: {{DAYS}} from {{TIME RANGE}} with {{SPECIAL OFFERS}}.`,

    healthcare: `Services Offered: {{Primary care, specialty services, preventive care, etc.}}
Office Hours: {{Monday-Friday: 9:00 AM - 5:00 PM, extended hours on [DAYS] until [TIME]}}
Insurance: We accept {{INSURANCE PLANS}} including {{MAJOR PROVIDERS LIST}}.
New Patients: {{Currently accepting/Not accepting}} new patients. First appointments typically last {{X MINUTES}}.
Appointments: Routine check-ups should be scheduled at least {{X DAYS/WEEKS}} in advance. Same-day appointments are available for urgent matters.
Prescription Refills: Please allow {{X HOURS}} for prescription refill requests.
Telehealth: {{Available/Not available}} for {{TYPES OF APPOINTMENTS}}.
Special Services: {{Additional services offered by your practice}}.`,

    hotel: `Accommodations: We offer {{ROOM TYPES}} with {{BED CONFIGURATIONS}}.
Check-in/Check-out: Check-in time is {{TIME}} and check-out time is {{TIME}}.
Amenities: Our hotel features {{LIST KEY AMENITIES: pool, fitness center, etc.}}
Dining: Our on-site restaurant serves {{MEAL TYPES}} from {{TIME RANGES}}.
Reservations: We recommend booking at least {{X DAYS/WEEKS}} in advance during {{PEAK SEASON MONTHS}}.
Cancellation Policy: Cancellations must be made {{X HOURS}} before check-in to avoid a {{FEE DETAILS}}.
Parking: {{PARKING OPTIONS}} available for {{PRICE}} per night.
Pet Policy: {{Pet-friendly/No pets}} with a {{FEE DETAILS}} per stay.`,

    beauty: `Services Offered: {{LIST SERVICES: haircuts, coloring, facials, etc.}}
Hours: {{DAYS: 9:00 AM - 7:00 PM, WEEKENDS: 10:00 AM - 5:00 PM, CLOSED: [DAYS]}}
Appointments: We recommend booking {{X DAYS/WEEKS}} in advance, especially for {{PEAK TIMES}}.
Products: We use and sell {{PRODUCT BRANDS}}.
Cancellation Policy: Please provide {{X HOURS}} notice for cancellations to avoid a {{FEE DETAILS}}.
Gift Cards: We offer {{TYPES OF GIFT CARDS}} in {{DENOMINATIONS}}.
Special Services: {{SPECIAL OFFERINGS like bridal packages, group services, etc.}}
Membership/Loyalty: {{DETAILS OF ANY MEMBERSHIP OR LOYALTY PROGRAMS}}.`
  };

  // State to show template selection feedback
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Function to format template text with blue placeholders
  const formatTemplateText = (text: string) => {
    if (!text) return '';
    // Replace {{placeholder}} with styled spans
    return text.replace(/\{\{([^}]+)\}\}/g, (match, content) => {
      return content;
    });
  };

  // Function to apply a template
  const applyTemplate = (templateKey: keyof typeof industryTemplates) => {
    // Store raw template with {{placeholder}} syntax
    setFormData(prev => ({
      ...prev,
      additionalDetails: industryTemplates[templateKey]
    }));
    
    // Show feedback that template was applied
    setSelectedTemplate(templateKey);
    setTimeout(() => {
      setSelectedTemplate(null);
    }, 3000);
  };

  // Update greeting phrase when company name changes
  useEffect(() => {
    if (formData.companyName) {
      setFormData(prev => ({
        ...prev,
        greetingPhrase: `It's a great day at ${formData.companyName}! How can I help you?`
      }));
    }
  }, [formData.companyName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If changing company name, update greeting phrase
    if (name === 'companyName') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        greetingPhrase: `It's a great day at ${value}! How can I help you?`
      }));
    }
  };

  const handleVoiceSelect = (voiceId: string) => {
    setFormData(prev => ({
      ...prev,
      voiceId
    }));
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.companyName) {
        setError('Please enter your company name');
        return;
      }
      if (!formData.phoneNumber) {
        setError('Please enter your phone number');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.businessDescription) {
        setError('Please describe what your business does');
        return;
      }
      if (!formData.targetCustomers) {
        setError('Please describe your target customers');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.greetingPhrase) {
        setError('Please enter a greeting phrase');
        return;
      }
      if (!formData.voiceId) {
        setError('Please select a voice for your assistant');
        return;
      }
    }

    setError(null);
    
    // If we're on step 4 and about to go to step 5, we need to create the assistant
    if (currentStep === 4) {
      handleCreateAssistant();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    // Don't allow going back from the test step
    if (currentStep === 5) {
      return;
    }
    
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const generateSystemPrompt = () => {
    return `You are an AI phone receptionist for ${formData.companyName}. 
The business phone number is ${formData.phoneNumber}. 
This business specializes in ${formData.businessDescription}, serving ${formData.targetCustomers}. 
Please greet callers with the phrase: "${formData.greetingPhrase}" 
Additional details: ${formData.additionalDetails}`;
  };

  const handleCreateAssistant = async () => {
    setLoading(true);
    setError(null);

    try {
      const systemPrompt = generateSystemPrompt();
      
      const requestBody = {
        name: formData.companyName,
        firstMessage: formData.greetingPhrase,
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: systemPrompt
            }
          ]
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US"
        },
        voice: {
          provider: "playht",
          voiceId: formData.voiceId
        }
      };

      // Generate signature using the creation API key
      const signature = CryptoJS.HmacSHA256(JSON.stringify(requestBody), CREATION_API_KEY).toString();

      const response = await fetch('https://api.vapi.ai/assistant', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CREATION_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'vapi-signature': signature
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `API Error: ${response.status}`);
      }

      console.log('Created assistant with ID:', data.id);

      // Save to Supabase
      await createAssistant({
        name: formData.companyName,
        first_message: formData.greetingPhrase,
        system_prompt: systemPrompt,
        language: "en-US",
        voice_id: formData.voiceId,
        temperature: 0.7,
        assistant_id: data.id
      });

      // Set the created assistant ID
      setCreatedAssistantId(data.id);
      
      // Move to test step
      setCurrentStep(5);
    } catch (err) {
      console.error('Error creating assistant:', err);
      setError(err instanceof Error ? err.message : 'Failed to create your AI assistant');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    setShowPublishModal(true);
    setIsPublished(true);
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Tell Us About Your Business</h2>
            <p className="text-gray-400">We'll use this information to create your AI phone receptionist.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Example: Riverside Landscaping"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Example: +1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">What Does Your Business Do?</h2>
            <p className="text-gray-400">Help your AI receptionist understand who you serve and what you offer.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Description
                </label>
                <input
                  type="text"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Example: Landscaping and Construction"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Customers
                </label>
                <input
                  type="text"
                  name="targetCustomers"
                  value={formData.targetCustomers}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Example: Homeowners in Boise, Idaho"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Customize Your Assistant's Voice</h2>
            <p className="text-gray-400">Select a voice and greeting for your AI receptionist.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose a Voice
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jennifer Voice Option */}
                  <div 
                    onClick={() => handleVoiceSelect('jennifer')}
                    className={`relative p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.voiceId === 'jennifer' 
                        ? 'bg-purple-500/20 border-purple-500' 
                        : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-3 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                          alt="Jennifer" 
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${formData.voiceId === 'jennifer' ? 'opacity-0' : 'opacity-0'}`}>
                          <Volume2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Jennifer</h3>
                        <p className="text-sm text-gray-400">Professional female voice</p>
                      </div>
                    </div>
                    
                    {formData.voiceId === 'jennifer' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="mt-3 text-sm text-gray-300">
                      <span className="font-medium">"</span>
                      <span className="italic">Hello, this is Jennifer speaking. How may I assist you today?</span>
                      <span className="font-medium">"</span>
                    </div>
                    
                    <div className="mt-2 flex justify-center">
                      <div className="w-3/4 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Michael Voice Option */}
                  <div 
                    onClick={() => handleVoiceSelect('michael')}
                    className={`relative p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.voiceId === 'michael' 
                        ? 'bg-blue-500/20 border-blue-500' 
                        : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-3 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                          alt="Michael" 
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${formData.voiceId === 'michael' ? 'opacity-0' : 'opacity-0'}`}>
                          <Volume2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Michael</h3>
                        <p className="text-sm text-gray-400">Friendly male voice</p>
                      </div>
                    </div>
                    
                    {formData.voiceId === 'michael' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="mt-3 text-sm text-gray-300">
                      <span className="font-medium">"</span>
                      <span className="italic">Hi there! Michael speaking. What can I do for you today?</span>
                      <span className="font-medium">"</span>
                    </div>
                    
                    <div className="mt-2 flex justify-center">
                      <div className="w-3/4 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Greeting Phrase
                </label>
                <input
                  type="text"
                  name="greetingPhrase"
                  value={formData.greetingPhrase}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="It's a great day at your company! How can I help you?"
                  disabled
                />
                <p className="mt-2 text-xs text-gray-400">This greeting will be used by your AI receptionist when answering calls.</p>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Any Additional Details?</h2>
            <p className="text-gray-400">The more details you provide, the more accurately your AI can answer callers.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Choose a Template (Optional)
              </label>
              {selectedTemplate && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>
                    <strong className="capitalize">{selectedTemplate}</strong> template applied! You can now customize the details below.
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => applyTemplate('restaurant')}
                  className="flex items-center px-4 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 text-left transition-all duration-300"
                >
                  <UtensilsCrossed className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
                  <span className="font-medium text-white flex-grow">Restaurant Template</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('healthcare')}
                  className="flex items-center px-4 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 text-left transition-all duration-300"
                >
                  <Stethoscope className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                  <span className="font-medium text-white flex-grow">Healthcare Template</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('hotel')}
                  className="flex items-center px-4 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 text-left transition-all duration-300"
                >
                  <Building className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="font-medium text-white flex-grow">Hotel & Resort Template</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('beauty')}
                  className="flex items-center px-4 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 text-left transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="font-medium text-white flex-grow">Beauty & Wellness Template</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">Select a template to pre-fill with industry-specific information that you can customize.</p>
            </div>

            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Info className="h-4 w-4 text-gray-400 mr-2" />
                  <span>Additional Information <span className="font-bold">(Edit placeholder text below)</span></span>
                </label>
              </div>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                rows={12}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                placeholder="Fill in all placeholder text with your specific business information"
              />
              
              <div className="mt-3 bg-gray-800/50 border border-gray-700/50 rounded p-3 text-xs flex items-start">
                <div className="bg-gray-700/70 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                  <Info className="h-3 w-3 text-gray-300" />
                </div>
                <div>
                  <p className="text-gray-300 mb-1">
                    <span className="font-bold">Important:</span> Replace all placeholder text that appears in double curly braces.
                  </p>
                  <p className="text-gray-400">
                    For example, replace text like <span className="font-bold">&#123;&#123;ROOM TYPES&#125;&#125;</span> and <span className="font-bold">&#123;&#123;BED CONFIGURATIONS&#125;&#125;</span> with your actual business information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5: // Test Your Assistant
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm flex items-center mb-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Creation Complete</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">Test Your AI Assistant</h2>
              <p className="text-gray-400 mb-6">Your AI assistant has been created successfully! Try it out below.</p>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 mb-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  Click the phone button below to start a conversation with your AI assistant.
                  This will help you test how it responds before going live.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm">
              <AIAssistant assistantId={createdAssistantId || undefined} />
            </div>
            
            <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-6">
              <h3 className="font-medium text-white mb-2">Assistant Configuration</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-gray-400 w-32">Name:</span>
                  <span className="text-gray-200">{formData.companyName}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Voice:</span>
                  <span className="text-gray-200">{formData.voiceId === 'jennifer' ? 'Jennifer (Female)' : 'Michael (Male)'}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Greeting:</span>
                  <span className="text-gray-200">{formData.greetingPhrase}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={() => navigate('/my-assistant/manage')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-lg flex items-center font-medium hover:from-green-600 hover:to-teal-600 transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <button 
                onClick={handlePublish}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg flex items-center font-medium hover:from-purple-600 hover:to-blue-600 transition-colors"
              >
                <span>PUBLISH</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-md overflow-hidden">
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {isPublished && <Confetti numberOfPieces={200} recycle={false} />}
          <div className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <PartyPopper className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-300 mb-4">
              You have successfully published your assistant!
            </p>
            <p className="text-gray-400 mb-6">
              We will contact you shortly to assign your assistant to your number.
            </p>
            <button
              onClick={() => setShowPublishModal(false)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-colors w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="border-b border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-400">
            {currentStep < totalSteps ? `Step ${currentStep} of ${totalSteps - 1}` : 'Assistant Ready'}
          </div>
          <div className="text-sm text-gray-400">
            {Math.round((currentStep / (totalSteps - 1)) * 100)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${Math.min((currentStep / (totalSteps - 1)) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="p-6">
        {renderStepContent()}
        
        {error && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-400 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20">
              <span className="text-red-400">!</span>
            </div>
            <p>{error}</p>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && currentStep < 5 ? (
            <button 
              onClick={prevStep}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div> // Empty div to maintain flex layout
          )}
          
          {currentStep < 5 ? (
            <button 
              onClick={nextStep}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg flex items-center font-medium hover:from-purple-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && currentStep === 4 ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Creating Assistant...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === 4 ? 'Create Assistant' : 'Next'}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={() => navigate('/my-assistant/manage')}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-lg flex items-center font-medium hover:from-green-600 hover:to-teal-600 transition-colors"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;