import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, ChevronRight, Zap, DollarSign, PoundSterling, Shield } from 'lucide-react';

// Subscription plan types
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
  priceId: string;
  description: string;
  features: string[];
  callMinutes: number;
  recommended?: boolean;
  guarantees: string[];
}

function PlanSelection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  
  // Subscription plans
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
      priceId: 'price_starter',
      description: 'For personal or small business use',
      features: [
        '30 minutes of calls per month',
        'Basic voice customization',
        'Standard response time',
        'Email support'
      ],
      callMinutes: 30,
      guarantees: [
        'No credit card required',
        'Cancel anytime'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      priceUSD: {
        monthly: '$29',
        yearly: '$290'
      },
      priceGBP: {
        monthly: '£23',
        yearly: '£230'
      },
      priceId: billingCycle === 'monthly' ? 'price_pro_monthly' : 'price_pro_yearly',
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
      recommended: true,
      guarantees: [
        '14-day money-back guarantee',
        'Downgrade anytime'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      priceUSD: {
        monthly: '$79',
        yearly: '$790'
      },
      priceGBP: {
        monthly: '£62',
        yearly: '£620'
      },
      priceId: billingCycle === 'monthly' ? 'price_premium_monthly' : 'price_premium_yearly',
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
      guarantees: [
        '14-day money-back guarantee',
        'Downgrade anytime'
      ]
    }
  ];

  // Handle plan selection and continue
  const handleContinue = () => {
    // In a real app, this would save the selected plan to the user's account
    console.log(`Selected plan: ${selectedPlan}, billing: ${billingCycle}, currency: ${currency}`);
    
    // Redirect to assistant creation
    navigate('/my-assistant/create');
  };

  // Toggle billing cycle
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  // Toggle currency
  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'GBP' : 'USD');
  };

  // Get current price based on selected currency and billing cycle
  const getCurrentPrice = (plan: Plan) => {
    if (currency === 'USD') {
      return billingCycle === 'monthly' ? plan.priceUSD.monthly : plan.priceUSD.yearly;
    } else {
      return billingCycle === 'monthly' ? plan.priceGBP.monthly : plan.priceGBP.yearly;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gray-900 z-0">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-br from-purple-900/30 via-indigo-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-tl from-teal-900/30 via-blue-800/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}></div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 pt-20 pb-12 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select the plan that fits your needs and start using your AI assistant right away
            </p>
          </div>

          {/* Billing Cycle and Currency Toggles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
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

          {/* Available Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-gray-800/60 backdrop-blur-xl rounded-xl border ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500/80 ring-2 ring-blue-500/30' 
                    : plan.recommended 
                      ? 'border-purple-500/50' 
                      : 'border-gray-700/50'
                } shadow-md overflow-hidden relative cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Free Trial Badge */}
                <div className="absolute top-4 left-4 bg-green-600/80 text-white text-xs px-3 py-1 rounded-full">
                  Free trial
                </div>
                
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                    Recommended
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mt-4">{plan.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold text-white">{getCurrentPrice(plan)}</span>
                    <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Guarantees */}
                  <div className="mb-6 p-3 bg-gray-700/30 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-400" />
                      Guarantees
                    </h4>
                    <ul className="space-y-2">
                      {plan.guarantees.map((guarantee, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-center">
                          <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {guarantee}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-700/50 hover:bg-gray-700/80 text-gray-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center text-lg"
            >
              <span>Continue with {plans.find(p => p.id === selectedPlan)?.name} Plan</span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Enterprise-grade security</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>Upgrade or downgrade anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanSelection; 