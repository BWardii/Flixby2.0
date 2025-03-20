import React, { useState } from 'react';
import { Check, X, CreditCard, Shield, Clock, Zap, DollarSign, PoundSterling, ChevronDown, ChevronUp, Phone, Bot, Users, MessageSquare, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Update the plan interface to include originalPrice fields
  interface Plan {
    id: string;
    name: string;
    priceUSD: {
      monthly: string;
      yearly: string;
    };
    priceGBP: {
      monthly: string;
      yearly: string;
    };
    description: string;
    features: string[];
    callMinutes: number;
    highlighted?: boolean;
    guarantees?: string[];
    originalPriceUSD?: {
      monthly: string;
      yearly: string;
    };
    originalPriceGBP?: {
      monthly: string;
      yearly: string;
    };
  }

  // Plans based on subscription.ts with the updated price information
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      priceUSD: {
        monthly: '$0',
        yearly: '$0'
      },
      priceGBP: {
        monthly: '£0',
        yearly: '£0'
      },
      description: 'For personal or small business use',
      features: [
        '30 minutes of calls per month',
        'Basic voice customization',
        'Standard response time',
        'Email support'
      ],
      callMinutes: 30,
      highlighted: false,
      guarantees: [
        'No credit card required',
        'Cancel anytime'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      priceUSD: {
        monthly: '$189',
        yearly: '$189'
      },
      priceGBP: {
        monthly: '£149',
        yearly: '£149'
      },
      description: 'For growing businesses',
      features: [
        '120 minutes of calls per month',
        'Advanced voice customization',
        'Faster response time',
        'Priority email support',
        'Call analytics dashboard',
        'Custom greeting messages'
      ],
      callMinutes: 120,
      highlighted: true,
      guarantees: [
        '14-day money-back guarantee',
        'Downgrade anytime'
      ],
      originalPriceUSD: {
        monthly: '$239',
        yearly: '$239'
      },
      originalPriceGBP: {
        monthly: '£179',
        yearly: '£179'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      priceUSD: {
        monthly: '$379',
        yearly: '$379'
      },
      priceGBP: {
        monthly: '£299',
        yearly: '£299'
      },
      description: 'For larger organizations',
      features: [
        'Unlimited calls',
        'Premium voice options',
        'Fastest response time',
        '24/7 priority support',
        'Advanced analytics',
        'Multiple assistant profiles',
        'Custom integrations',
        'Dedicated account manager'
      ],
      callMinutes: -1, // Unlimited
      highlighted: false,
      guarantees: [
        '14-day money-back guarantee',
        'Downgrade anytime'
      ],
      originalPriceUSD: {
        monthly: '$479',
        yearly: '$479'
      },
      originalPriceGBP: {
        monthly: '£375',
        yearly: '£375'
      }
    }
  ];

  // Get current price based on selected currency and billing cycle
  const getCurrentPrice = (plan: typeof plans[0]) => {
    if (currency === 'USD') {
      return billingCycle === 'monthly' ? plan.priceUSD.monthly : plan.priceUSD.yearly;
    } else {
      return billingCycle === 'monthly' ? plan.priceGBP.monthly : plan.priceGBP.yearly;
    }
  };

  // Define interface for comparison features table
  interface ComparisonFeature {
    name: string;
    starter: string | boolean;
    professional: string | boolean;
    premium: string | boolean;
  }

  // Comparison table data
  const comparisonFeatures: ComparisonFeature[] = [
    { name: 'Call Minutes', starter: '30 minutes', professional: '120 minutes', premium: 'Unlimited', },
    { name: 'Voice Customization', starter: 'Basic', professional: 'Advanced', premium: 'Premium', },
    { name: 'Response Time', starter: 'Standard', professional: 'Fast', premium: 'Fastest', },
    { name: 'Support', starter: 'Email', professional: 'Priority Email', premium: '24/7 Priority', },
    { name: 'Analytics', starter: 'Basic', professional: 'Call Dashboard', premium: 'Advanced Analytics', },
    { name: 'Custom Greetings', starter: false, professional: true, premium: true, },
    { name: 'Multiple Assistants', starter: false, professional: false, premium: true, },
    { name: 'Custom Integrations', starter: false, professional: false, premium: true, },
    { name: 'Dedicated Account Manager', starter: false, professional: false, premium: true, },
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'How do the calling minutes work?',
      answer: "Our plans include a set number of calling minutes per month (or unlimited with Premium). These are the total minutes your AI assistant can spend on calls. Minutes roll over to the next month for up to 90 days, and you can always upgrade to a higher tier if you need more time."
    },
    {
      question: 'Can I change plans later?',
      answer: "Yes! You can upgrade your plan at any time as your business grows. You can also downgrade at the end of your billing cycle if you need to adjust your usage."
    },
    {
      question: 'Are there any hidden fees?',
      answer: "No, our pricing is transparent. You pay exactly what you see - the monthly or annual fee for your chosen plan. There are no setup fees, no hidden costs, and no surprise charges."
    },
    {
      question: 'What happens if I exceed my minutes?',
      answer: "If you approach your monthly limit, we'll notify you in advance. You can choose to upgrade to a higher tier or purchase additional minutes as needed. We'll never cut off your service without warning."
    },
    {
      question: 'Can I get a custom plan for my enterprise?',
      answer: "Absolutely! For larger organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements and we'll create a tailored package for you."
    },
    {
      question: 'Do you offer a free trial?',
      answer: "Yes! Our Starter plan is completely free and gives you 30 minutes of calls per month to test our service. Additionally, our paid plans come with a 14-day money-back guarantee, so you can try them risk-free."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-purple-900/30 via-indigo-800/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-teal-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2 bg-purple-500/10 backdrop-blur-lg rounded-full px-4 py-2 border border-purple-500/20">
                <CreditCard className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-purple-300">Simple, Transparent Pricing</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Choose the Perfect Plan
              </span>
              <br />
              <span className="text-white">For Your Business</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              All plans include our powerful AI phone assistant, 24/7 availability, 
              and no hidden fees. Start with a free plan or scale as your business grows.
            </p>
            
            {/* Billing Cycle and Currency Toggles */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              {/* Billing Cycle Toggle */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-full p-1 flex items-center">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-purple-700/50 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                    billingCycle === 'yearly'
                      ? 'bg-purple-700/50 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly <span className="ml-1 text-xs font-normal bg-green-900/40 text-green-400 px-1.5 py-0.5 rounded">Save 20%</span>
                </button>
              </div>

              {/* Currency Toggle */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-full p-1 flex items-center">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                    currency === 'USD'
                      ? 'bg-blue-700/50 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setCurrency('USD')}
                >
                  <DollarSign className="h-4 w-4 mr-1" /> USD
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                    currency === 'GBP'
                      ? 'bg-blue-700/50 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setCurrency('GBP')}
                >
                  <PoundSterling className="h-4 w-4 mr-1" /> GBP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative flex flex-col min-h-[600px] rounded-2xl overflow-hidden ${
                  plan.id === 'professional' 
                    ? 'border-2 border-purple-500/50 bg-gradient-to-b from-purple-900/40 to-gray-800/80' 
                    : 'border border-gray-700 bg-gray-800/40'
                }`}
              >
                {plan.id === 'professional' && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold text-center py-1.5">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-6 sm:p-8 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    {plan.id !== 'starter' && plan.originalPriceUSD ? (
                      <>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl font-medium text-gray-400 line-through mr-2">
                            {currency === 'USD' 
                              ? (billingCycle === 'monthly' ? plan.originalPriceUSD?.monthly : plan.originalPriceUSD?.yearly)
                              : (billingCycle === 'monthly' ? plan.originalPriceGBP?.monthly : plan.originalPriceGBP?.yearly)
                            }
                          </span>
                          <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded">
                            20% OFF
                          </span>
                        </div>
                        <span className="text-4xl font-bold text-white">{getCurrentPrice(plan)}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-white">{getCurrentPrice(plan)}</span>
                    )}
                    
                    {billingCycle === 'monthly' ? (
                      <span className="text-gray-400 ml-2">/ month</span>
                    ) : (
                      <span className="text-gray-400 ml-2">/ year</span>
                    )}
                    
                    {billingCycle === 'yearly' && !plan.originalPriceUSD && (
                      <div className="mt-2 inline-block bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded">
                        Save {plan.id === 'professional' ? '17%' : '16%'} with annual billing
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-700 my-6 pt-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <svg 
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 mt-auto">
                  {plan.guarantees && plan.guarantees.length > 0 && (
                    <div className="mb-6">
                      {plan.guarantees.map((guarantee, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-400 mb-2">
                          <svg 
                            className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{guarantee}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    className={`w-full py-3 px-6 rounded-xl flex items-center justify-center space-x-2 ${
                      plan.id === 'starter' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-purple-500/20'
                    } transition-all duration-300`}
                  >
                    <span>{plan.id === 'starter' ? 'Start for Free' : 'Choose Plan'}</span>
                    <svg 
                      className="h-5 w-5 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Compare Plans
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A detailed breakdown of what's included in each plan to help you make the best choice
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50">
              <thead>
                <tr className="bg-gray-800/80">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 bg-purple-900/20">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {comparisonFeatures.map((feature, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? 
                          <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">{feature.starter}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-purple-900/10">
                      {typeof feature.professional === 'boolean' ? (
                        feature.professional ? 
                          <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">{feature.professional}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? 
                          <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Why Choose Flixby
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              More than just an AI phone service - we're your partner in business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
              <div className="w-12 h-12 mb-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">State-of-the-Art AI</h3>
              <p className="text-gray-400">
                Our advanced AI technology understands context, handles complex conversations, and delivers natural, human-like interactions.
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-purple-500/30">
              <div className="w-12 h-12 mb-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">24/7 Availability</h3>
              <p className="text-gray-400">
                Never miss a call again. Our AI assistant works around the clock, handling customer inquiries even when you're away.
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-green-500/30">
              <div className="w-12 h-12 mb-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seamless Integration</h3>
              <p className="text-gray-400">
                Easily integrates with your existing systems and workflows, ensuring a smooth transition and maximum business impact.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/sign-up')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Try Flixby For Free
            </button>
            <p className="mt-4 text-gray-400">No credit card required for Starter plan</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Have questions? We have answers
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-800/40 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-left font-medium text-white">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-blue-500/20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that have already revolutionized their customer service with Flixby's AI phone assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/sign-up')} 
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
              >
                Get Started for Free
              </button>
              <button 
                onClick={() => navigate('/use-cases')}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all duration-300"
              >
                Explore Use Cases
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;