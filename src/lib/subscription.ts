import { getAssistantUsageMinutes } from './vapi';

export interface Plan {
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
}

// Default plans data
export const defaultPlans: Plan[] = [
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
    callMinutes: 30
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
    priceId: 'price_pro_monthly',
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
    recommended: true
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
    priceId: 'price_premium_monthly',
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
    callMinutes: -1 // Unlimited
  }
];

/**
 * Get plan by ID
 */
export function getPlanById(planId: string): Plan {
  return defaultPlans.find(plan => plan.id === planId) || defaultPlans[0];
}

/**
 * Calculate minutes left based on plan and usage
 * Returns -1 for unlimited plans
 */
export async function calculateMinutesLeft(planId: string, assistantId: string, minutesUsed?: number): Promise<number> {
  console.log(`calculateMinutesLeft called with planId=${planId}, assistantId=${assistantId}, minutesUsed=${minutesUsed}`);
  
  const plan = getPlanById(planId);
  
  // If plan has unlimited minutes, return -1
  if (plan.callMinutes === -1) {
    console.log(`Plan ${planId} has unlimited minutes`);
    return -1;
  }
  
  // If minutes used was provided, use it; otherwise fetch from API
  let usedMinutes = minutesUsed;
  if (usedMinutes === undefined && assistantId) {
    try {
      console.log(`Fetching usage minutes for assistant ${assistantId}`);
      usedMinutes = await getAssistantUsageMinutes(assistantId);
      console.log(`Fetched usage minutes: ${usedMinutes}`);
    } catch (error) {
      console.error('Error fetching minutes used:', error);
      usedMinutes = 0; // Default to 0 if there's an error
    }
  }
  
  // Ensure usedMinutes is a valid number
  if (usedMinutes === undefined || usedMinutes === null || isNaN(Number(usedMinutes))) {
    console.log(`Invalid usedMinutes (${usedMinutes}), defaulting to 0`);
    usedMinutes = 0;
  }
  
  // Calculate minutes left
  const minutesLeft = Math.max(0, plan.callMinutes - (usedMinutes || 0));
  console.log(`Plan minutes: ${plan.callMinutes}, Used minutes: ${usedMinutes}, Minutes left: ${minutesLeft}`);
  return minutesLeft;
}

/**
 * Format minutes display with appropriate text
 */
export function formatMinutesDisplay(minutes: number): string {
  if (minutes === -1) {
    return "Unlimited";
  }
  
  return `${minutes.toFixed(0)} min`;
} 