import React, { useState } from 'react';
import {
  Mic,
  Brain,
  Zap,
  Shield,
  Globe,
  BarChart,
  Cpu,
  Cloud,
  MessageSquare,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Users,
  LucideIcon,
  Headphones,
  Settings,
  Database,
  LineChart,
  Lock,
  Layers,
  PanelRight,
  Workflow,
  Server,
  Code,
  BarChart3,
  BrainCircuit,
  Share2,
  FileCog,
  MessagesSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface FeatureCategory {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    detailedDescription: string;
    icon: React.ReactNode;
    techSpecs?: string[];
  }[];
}

interface ComparisonItem {
  feature: string;
  traditional: string;
  flixby: string;
}

function Features() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  // Detailed feature categories with expanded information
  const featureCategories: FeatureCategory[] = [
    {
      title: "Intelligent Communication",
      description: "Connect with your customers through state-of-the-art conversational AI",
      features: [
        {
          icon: <Mic className="h-6 w-6 text-blue-400" />,
      title: 'Natural Voice Interaction',
          description: 'Human-like voice interactions that feel natural and engaging',
          detailedDescription: 'Our advanced speech recognition technology understands natural speech patterns, accents, and colloquialisms with over 98% accuracy. The voice synthesis creates responses that sound remarkably human, with appropriate intonation, pacing, and emotional resonance.',
          techSpecs: [
            '16kHz audio sampling for high-quality voice capture',
            'Multi-accent recognition trained on 100+ regional dialects',
            'Real-time noise cancellation and speech enhancement',
            'Ultra-low latency response (250ms or less)'
          ]
        },
        {
          icon: <BrainCircuit className="h-6 w-6 text-blue-400" />,
          title: 'AI-Powered Understanding',
          description: 'Contextual understanding powered by advanced language models',
          detailedDescription: 'Flixby leverages state-of-the-art large language models to understand the full context and intent behind every customer interaction. The system maintains conversation history to provide coherent, contextually appropriate responses even in complex, multi-turn conversations.',
          techSpecs: [
            'Built on foundation models with 175B+ parameters',
            'Semantic memory for conversation context retention',
            'Intent recognition with 96% accuracy',
            'Domain-specific training for your industry terminology'
          ]
        },
        {
          icon: <MessagesSquare className="h-6 w-6 text-blue-400" />,
          title: 'Conversational Intelligence',
          description: 'Understands context, handles interruptions, and maintains natural flow',
          detailedDescription: 'Flixby can handle the unpredictable nature of human conversations, including interruptions, topic changes, and non-linear discussions. The system detects customer emotions and adapts its tone and responses accordingly, creating a more empathetic experience.',
          techSpecs: [
            'Barge-in detection and graceful interruption handling',
            'Sentiment analysis with emotional response adaptation',
            'Automatic disambiguation of unclear requests',
            'Multi-intent recognition in single utterances'
          ]
        }
      ]
    },
    {
      title: "Business Efficiency",
      description: "Streamline operations and enhance customer service",
      features: [
        {
          icon: <Zap className="h-6 w-6 text-purple-400" />,
          title: 'Real-Time Processing',
          description: 'Lightning-fast response times with minimal latency',
          detailedDescription: 'Flixby processes customer inquiries in real-time, with response generation typically under 300 milliseconds. This speed ensures natural conversation flow and prevents awkward pauses that break the illusion of speaking with a human agent.',
          techSpecs: [
            'Edge computing architecture for minimal latency',
            'Parallel processing of speech and intent recognition',
            'Pre-cached responses for common queries',
            'Adaptive processing based on connection quality'
          ]
        },
        {
          icon: <Clock className="h-6 w-6 text-purple-400" />,
          title: '24/7 Availability',
          description: 'Never miss a call with round-the-clock service',
          detailedDescription: 'Unlike human agents, Flixby is always available, handling calls during nights, weekends, and holidays. This ensures perfect coverage during peak times, across time zones, and during unexpected surges in call volume without increased staffing costs.',
          techSpecs: [
            '99.99% uptime guarantee with redundant systems',
            'Auto-scaling infrastructure for handling call surges',
            'Unlimited concurrent call capability',
            'Seamless failover between data centers'
          ]
        },
        {
          icon: <LineChart className="h-6 w-6 text-purple-400" />,
          title: 'Customer Insights',
          description: 'Gather valuable data from every interaction',
          detailedDescription: 'Every conversation becomes a source of business intelligence. Flixby automatically analyzes call patterns, common questions, customer sentiment, and conversion rates. These insights help you improve your products, services, and overall customer experience.',
          techSpecs: [
            'Real-time analytics dashboard with customizable metrics',
            'Automatic trend detection and anomaly alerts',
            'Sentiment tracking across customer segments',
            'Exportable reports and API access to raw data'
          ]
        }
      ]
    },
    {
      title: "Enterprise Ready",
      description: "Built with the needs of modern businesses in mind",
      features: [
        {
          icon: <Lock className="h-6 w-6 text-green-400" />,
          title: 'Enterprise Security',
          description: 'Bank-grade encryption and comprehensive data protection',
          detailedDescription: 'Security is built into every layer of Flixby. All communications are encrypted end-to-end, and sensitive data is automatically redacted from transcripts. Our infrastructure is SOC 2 Type II compliant and regularly undergoes penetration testing by third-party security firms.',
          techSpecs: [
            'AES-256 encryption for all data at rest and in transit',
            'SOC 2 Type II and HIPAA compliance',
            'Automated PII/PCI detection and redaction',
            'Role-based access controls with audit logging'
          ]
        },
        {
          icon: <Layers className="h-6 w-6 text-green-400" />,
          title: 'Seamless Integration',
          description: 'Connect with your existing systems and workflows',
          detailedDescription: 'Flixby integrates with your CRM, helpdesk, e-commerce platform, and other business systems. This allows the AI to access customer data, order history, and account information to provide personalized service and take actions like updating records or processing orders.',
          techSpecs: [
            'Pre-built connectors for Salesforce, Zendesk, Shopify, and more',
            'REST API for custom integrations',
            'Webhook support for event-driven workflows',
            'OAuth and API token authentication'
          ]
        },
        {
          icon: <Database className="h-6 w-6 text-green-400" />,
          title: 'Advanced Analytics',
          description: 'Comprehensive insights to optimize performance',
          detailedDescription: 'Our analytics platform provides deep visibility into call performance, customer satisfaction, and business outcomes. Track conversion rates, resolution times, common issues, and agent performance across departments and time periods.',
          techSpecs: [
            'Interactive dashboards with drill-down capabilities',
            'A/B testing for different voice prompts and scripts',
            'Predictive analytics for call volume forecasting',
            'Custom report builder with scheduled delivery'
          ]
        }
      ]
    }
  ];

  // Advanced technical capabilities section
  const technicalCapabilities = [
    {
      icon: <Server className="h-10 w-10 text-indigo-400" />,
      title: "Scalable Infrastructure",
      description: "Our cloud-native architecture automatically scales to handle from 10 to 10,000+ simultaneous calls without degradation in performance or voice quality."
    },
    {
      icon: <Code className="h-10 w-10 text-pink-400" />,
      title: "Extensive API",
      description: "Comprehensive REST API allows developers to integrate Flixby's voice capabilities into any application, with SDKs available for JavaScript, Python, Java, and more."
    },
    {
      icon: <FileCog className="h-10 w-10 text-amber-400" />,
      title: "Custom Training",
      description: "Train Flixby on your specific products, services, and company knowledge using our simple document upload interface or API-based knowledge management."
    },
    {
      icon: <Share2 className="h-10 w-10 text-emerald-400" />,
      title: "Omnichannel Support",
      description: "Deliver consistent experiences across phone, website chat, SMS, and popular messaging platforms with a single AI brain powering all channels."
    }
  ];

  // Comparison between traditional call centers and Flixby
  const comparisonData: ComparisonItem[] = [
    {
      feature: "Availability",
      traditional: "Limited by staff hours and time zones",
      flixby: "24/7/365 with consistent quality"
    },
    {
      feature: "Scalability",
      traditional: "Requires hiring and training new staff",
      flixby: "Instant scaling with no additional cost"
    },
    {
      feature: "Consistency",
      traditional: "Varies by agent mood and experience",
      flixby: "100% consistent responses and adherence to policy"
    },
    {
      feature: "Knowledge",
      traditional: "Limited to agent training and memory",
      flixby: "Instant access to your entire knowledge base"
    },
    {
      feature: "Languages",
      traditional: "Requires multilingual staff",
      flixby: "Supports 25+ languages with native fluency"
    },
    {
      feature: "Cost",
      traditional: "$25-45 per hour per agent",
      flixby: "Fraction of the cost with predictable pricing"
    }
  ];

  // How it works steps
  const howItWorks = [
    {
      title: "1. Voice Recognition",
      description: "Advanced speech-to-text technology captures and understands your customers' spoken words with exceptional accuracy.",
      icon: <Headphones className="h-12 w-12 text-blue-400" />
    },
    {
      title: "2. AI Processing",
      description: "Our neural network analyzes the conversation context, customer intent, and relevant business data to determine the best response.",
      icon: <Brain className="h-12 w-12 text-purple-400" />
    },
    {
      title: "3. Knowledge Retrieval",
      description: "The system accesses your business knowledge base, product information, and customer data to provide accurate, personalized answers.",
      icon: <Database className="h-12 w-12 text-indigo-400" />
    },
    {
      title: "4. Response Generation",
      description: "Natural language generation creates human-like responses that sound natural and conversational, not robotic or scripted.",
      icon: <MessageSquare className="h-12 w-12 text-green-400" />
    },
    {
      title: "5. Voice Synthesis",
      description: "Text-to-speech technology converts the response into natural-sounding speech with appropriate tone, inflection, and pacing.",
      icon: <Mic className="h-12 w-12 text-red-400" />
    }
  ];

  // Key benefits displayed prominently
  const keyBenefits = [
    {
      title: "99% Call Answer Rate",
      description: "Never miss customer calls, even during peak times",
      icon: Phone
    },
    {
      title: "70% Resolution Rate",
      description: "Most customer inquiries resolved without human intervention",
      icon: CheckCircle
    },
    {
      title: "5-Minute Setup",
      description: "Quick and easy implementation with no technical expertise needed",
      icon: Zap
    }
  ];

  // Toggle feature expansion
  const toggleFeatureExpansion = (featureTitle: string) => {
    if (expandedFeature === featureTitle) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(featureTitle);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO 
        title="AI Voice Features & Capabilities" 
        description="Explore Flixby's powerful AI features including natural voice interaction, conversational intelligence, real-time processing, and enterprise-grade security."
        canonicalUrl="https://flixby.io/features"
      />
    
      {/* Hero Section - More dynamic with gradients and shapes */}
      <section className="relative overflow-hidden pt-28 pb-20">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-gray-900 to-gray-900"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full px-4 py-1 border border-blue-500/20">
                <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">AI-POWERED FEATURES</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Revolutionary AI Voice
              </span>
              <br />
              <span className="text-white">That Transforms Business</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Flixby's AI agent technology delivers human-like phone conversations 
              that delight customers and drive business results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/sign-up" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 flex items-center group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg border border-gray-700 transition-colors duration-300">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section - Visual metrics */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full px-4 py-1 border border-purple-500/20">
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">TECHNOLOGY</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                How Flixby AI Works
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our AI phone agent uses cutting-edge technology to create natural, effective conversations
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-green-500/50 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`md:flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                    
                    <div className="mx-auto md:mx-0 w-16 h-16 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center z-10 relative">
                      {step.icon}
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories - Interactive tabs */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full px-4 py-1 border border-blue-500/20">
                <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">CORE CAPABILITIES</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Powerful AI Features
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore the powerful capabilities that make Flixby the leading AI voice solution
            </p>
          </div>
          
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700">
            {featureCategories.map((category, index) => (
              <button
                key={index}
                className={`px-5 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ${
                  activeTab === index 
                  ? 'bg-gray-800 text-white border-t border-l border-r border-blue-500/30' 
                  : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          {/* Features for active category */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {featureCategories[activeTab].title}
            </h3>
            <p className="text-gray-400 mb-8">
              {featureCategories[activeTab].description}
            </p>
            
            <div className="space-y-6">
              {featureCategories[activeTab].features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="bg-gray-800/80 rounded-xl p-6 border border-gray-700/50 transition-all duration-300"
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer" 
                    onClick={() => toggleFeatureExpansion(feature.title)}
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {expandedFeature === feature.title ? (
                        <span className="text-xs border border-gray-600 rounded-full px-2 py-1">Hide Details</span>
                      ) : (
                        <span className="text-xs border border-gray-600 rounded-full px-2 py-1">Show Details</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedFeature === feature.title && (
                    <div className="mt-6 pl-16 border-t border-gray-700/50 pt-6 animate-fadeIn">
                      <p className="text-gray-300 mb-4">{feature.detailedDescription}</p>
                      
                      {feature.techSpecs && (
                        <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
                          <h5 className="text-sm font-semibold text-blue-400 mb-2">Technical Specifications</h5>
                          <ul className="space-y-2">
                            {feature.techSpecs.map((spec, specIndex) => (
                              <li key={specIndex} className="flex items-start">
                                <div className="text-green-400 mr-2">•</div>
                                <span className="text-gray-400 text-sm">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full px-4 py-1 border border-indigo-500/20">
                <span className="text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">ADVANCED CAPABILITIES</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Technical Excellence
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built on cutting-edge AI research and enterprise-grade infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalCapabilities.map((capability, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-6">{capability.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{capability.title}</h3>
                    <p className="text-gray-400">{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Flixby vs. Traditional Call Centers
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how Flixby AI transforms the customer service experience compared to traditional approaches
            </p>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-gray-700/50">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-gray-800">
              <div className="p-4 font-semibold text-gray-300 border-b border-gray-700">Feature</div>
              <div className="p-4 font-semibold text-gray-300 border-b border-gray-700 text-center">Traditional Call Center</div>
              <div className="p-4 font-semibold text-blue-300 border-b border-gray-700 text-center bg-blue-900/20">Flixby AI</div>
            </div>
            
            {/* Table rows */}
            {comparisonData.map((item, index) => (
              <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/20'}`}>
                <div className="p-4 font-medium text-white">{item.feature}</div>
                <div className="p-4 text-gray-400 text-center border-l border-gray-700/50">{item.traditional}</div>
                <div className="p-4 text-blue-200 text-center border-l border-gray-700/50 bg-blue-900/10">{item.flixby}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clear next steps */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-12 border border-gray-700/50 backdrop-blur-lg shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Ready to Transform Your Business?
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Join thousands of businesses already using Flixby to provide exceptional customer service 24/7.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/sign-up" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg flex items-center justify-center group">
                <span>Start Free Trial</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/pricing" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg border border-gray-700 flex items-center justify-center transition-colors duration-300">
                <span>View Pricing Plans</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;