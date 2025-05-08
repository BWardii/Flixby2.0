import React, { useState, useEffect } from 'react';
import { CreditCard, Check, Star, ChevronRight, Shield, Info, Clock, Settings, Award, Zap, DollarSign, PoundSterling, Clock3 } from 'lucide-react';
import { getAssistant } from '../../lib/assistant';
import { Assistant } from '../../lib/assistant';
import { defaultPlans, Plan, calculateMinutesLeft, formatMinutesDisplay } from '../../lib/subscription';
import { getAssistantUsageMinutes } from '../../lib/vapi';
import { fetchCallLogsFromStackby } from '../../lib/stackby';

function Subscription() {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [totalMinutesUsed, setTotalMinutesUsed] = useState<number>(0);
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  // Parse duration strings into minutes - copied from CallLogs component for consistency
  const parseDuration = (durationStr: string | undefined): number => {
    if (!durationStr) return 0;
    
    try {
      // Format: "0min 16sec" or "0min 16s"
      if (durationStr.includes('min') && (durationStr.includes('sec') || durationStr.includes('s'))) {
        const minMatch = durationStr.match(/(\d+)min/);
        const secMatch = durationStr.match(/(\d+)sec/) || durationStr.match(/(\d+)s/);
        
        const minutes = minMatch ? parseInt(minMatch[1]) : 0;
        const seconds = secMatch ? parseInt(secMatch[1]) : 0;
        
        return minutes + (seconds / 60);
      }
      
      // Format: "0.27" (decimal minutes)
      if (!isNaN(parseFloat(durationStr))) {
        return parseFloat(durationStr);
      }
      
      // Format: "0:16" (mm:ss)
      if (durationStr.includes(':')) {
        const [minutes, seconds] = durationStr.split(':').map(part => parseInt(part));
        return minutes + (seconds / 60);
      }
      
      return 0;
    } catch (err) {
      console.error('Error parsing duration:', durationStr, err);
      return 0;
    }
  };
  
  // Calculate total minutes - copied from CallLogs component for consistency
  const calculateTotalMinutes = (recordsList: any[]): number => {
    // First sum up all durations precisely
    const exactTotalMinutes = recordsList.reduce((total, record) => {
      const duration = parseDuration(record.field?.["Duration"]);
      return total + duration;
    }, 0);
    
    // Extract just the whole minutes part (floor)
    return Math.floor(exactTotalMinutes);
  };

  // Fetch assistant details and usage on component mount
  useEffect(() => {
    const fetchAssistantData = async () => {
      try {
        setLoading(true);
        const assistantData = await getAssistant();
        setAssistant(assistantData);
        
        // In a real app, you'd fetch the current subscription from a backend API
        // For this demo, we'll just simulate that the user is on the free plan
        setCurrentPlan('starter');
        
        // Fetch call logs to calculate minutes used - same method as CallLogs component
        if (assistantData?.assistant_id) {
          try {
            // Fetch all call logs from the API
            const allCallLogs = await fetchCallLogsFromStackby();
            
            // Filter logs for this assistant
            const assistantLogs = allCallLogs.filter(log => 
              log["Assistant ID"] === assistantData.assistant_id || 
              log.field?.["Assistant ID"] === assistantData.assistant_id
            );
            
            // Calculate total minutes using the same method as CallLogs page
            const usedMinutes = calculateTotalMinutes(assistantLogs);
            setTotalMinutesUsed(usedMinutes);
            
            // Calculate minutes left
            const minutes = await calculateMinutesLeft(currentPlan, assistantData.assistant_id, usedMinutes);
            setMinutesLeft(minutes);
          } catch (error) {
            console.error('Error fetching usage data:', error);
            setTotalMinutesUsed(0);
            setMinutesLeft(30); // Default to plan limit on error
          }
        }
      } catch (error) {
        console.error('Error fetching assistant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistantData();
  }, []);

  // Use the shared plans data
  const plans = defaultPlans;

  // Handle subscription upgrade
  const handleUpgrade = (planId: string, priceId: string) => {
    // In a real app, this would redirect to a checkout page or process the upgrade
    console.log(`Upgrading to plan ${planId} with price ID ${priceId}`);
    alert(`In a production app, this would redirect to checkout for the ${planId} plan.`);
  };

  // Toggle billing cycle
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  // Toggle currency
  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'GBP' : 'USD');
  };

  // Determine current plan details
  const getCurrentPlanDetails = () => {
    return plans.find(plan => plan.id === currentPlan) || plans[0];
  };

  const currentPlanDetails = getCurrentPlanDetails();

  // Get current price based on selected currency and billing cycle
  const getCurrentPrice = (plan: Plan) => {
    if (currency === 'USD') {
      return billingCycle === 'monthly' ? plan.priceUSD.monthly : plan.priceUSD.yearly;
    } else {
      return billingCycle === 'monthly' ? plan.priceGBP.monthly : plan.priceGBP.yearly;
    }
  };

  return (
    <div className="pt-20 sm:pt-24 p-4 sm:p-6 md:p-10 max-w-full overflow-x-hidden">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">Subscription</h1>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Manage your subscription and billing
            </p>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-md overflow-hidden">
          <div className="border-b border-gray-700/50 p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <h2 className="text-base sm:text-lg font-medium text-white">Current Plan</h2>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex items-center justify-center p-4 sm:p-8">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                <span className="ml-3 text-sm sm:text-base text-gray-400">Loading subscription details...</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center">
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full mr-2">
                        {currentPlanDetails.name}
                      </span>
                      {currentPlanDetails.recommended && (
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-3">
                      {getCurrentPrice(currentPlanDetails)}{' '}
                      <span className="text-sm text-gray-400 font-normal">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {currentPlanDetails.description}
                    </p>
                  </div>

                  {currentPlanDetails.id !== 'premium' && (
                    <button
                      onClick={() => handleUpgrade('professional', currentPlanDetails.priceId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center whitespace-nowrap transition-colors duration-200"
                    >
                      <span>Upgrade Plan</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Usage Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Minutes Used Card */}
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-3 bg-blue-900/30 p-2 rounded-md">
                        <Clock className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Minutes Used</div>
                        <div className="text-xl font-semibold text-white">
                          {totalMinutesUsed} min
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Current billing period
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Minutes Left Card */}
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-3 bg-green-900/30 p-2 rounded-md">
                        <Clock3 className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Minutes Left</div>
                        <div className="text-xl font-semibold text-white">
                          {loading ? (
                            <span className="text-gray-500">Loading...</span>
                          ) : minutesLeft === null ? (
                            <span className="text-gray-500">0</span>
                          ) : minutesLeft === -1 ? (
                            "Unlimited"
                          ) : (
                            `${minutesLeft} min`
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Refreshes monthly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Billing Cycle and Currency Toggles */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Billing Cycle Toggle */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-full p-1 flex items-center w-full sm:w-auto">
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
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-full p-1 flex items-center w-full sm:w-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-gray-800/60 backdrop-blur-xl rounded-xl border ${
                plan.recommended 
                  ? 'border-purple-500/50 ring-1 ring-purple-500/20' 
                  : 'border-gray-700/50'
              } shadow-md overflow-hidden relative flex flex-col h-full`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                  Recommended
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold text-white">{getCurrentPrice(plan)}</span>
                    <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      currentPlan === plan.id
                        ? 'bg-purple-900/30 text-purple-300 border border-purple-700/50 cursor-default'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                    onClick={() => currentPlan !== plan.id && handleUpgrade(plan.id, plan.priceId)}
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-md overflow-hidden mt-8 sm:mt-10">
          <div className="border-b border-gray-700/50 p-6">
            <h2 className="text-lg font-medium text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">How do call minutes work?</h3>
                <p className="text-gray-400 text-sm">Call minutes are based on the actual duration of calls your AI assistant handles. Unused minutes do not roll over to the next billing cycle.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Can I change my plan later?</h3>
                <p className="text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Do you offer refunds?</h3>
                <p className="text-gray-400 text-sm">We offer a 14-day money-back guarantee for all new paid subscriptions. Contact our support team to process a refund.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400 text-sm">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="rounded-lg bg-blue-900/20 border border-blue-800/30 p-3 sm:p-4 flex">
          <Shield className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-blue-300 font-medium mb-1">Secure Payment Processing</h3>
            <p className="text-blue-200/70 text-sm">
              All payments are securely processed through Stripe. We never store your complete payment information on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription; 