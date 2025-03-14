import Vapi from '@vapi-ai/web';

// Singleton instance
let vapiInstance: Vapi | null = null;

// Use the webcall API key for initialization
const WEBCALL_API_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || 'fb554eaf-b79c-45df-be1c-7f766e322f87';

export function initializeVapi(): Vapi {
  if (vapiInstance) {
    return vapiInstance;
  }

  try {
    vapiInstance = new Vapi(WEBCALL_API_KEY);
    console.log('Vapi initialized for webcalls');
    return vapiInstance;
  } catch (error) {
    console.error('Error initializing Vapi:', error);
    throw new Error('Failed to initialize Vapi. Please check your API key.');
  }
}

export function getVapiInstance(): Vapi {
  if (!vapiInstance) {
    return initializeVapi();
  }
  return vapiInstance;
}

export function resetVapiInstance(): void {
  vapiInstance = null;
}

export async function validateVapiKey(apiKey: string): Promise<boolean> {
  try {
    // Instead of using validateKey(), we'll make a simple API request to check if the key is valid
    const tempVapi = new Vapi(apiKey);
    
    // Make a simple request to check if the API key is valid
    // Using a simple fetch request to vAPI's voices endpoint
    const response = await fetch('https://api.vapi.ai/voices', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Vapi key validation failed:', error);
    return false;
  }
}

/**
 * Direct function to get sumDuration value for an assistant
 */
export async function getAssistantUsageMinutes(assistantId: string): Promise<number> {
  try {
    console.log(`================================`);
    console.log(`SEARCHING FOR ASSISTANT ID: "${assistantId}"`);
    
    // Basic query for analytics
    const analyticsQuery = {
      "queries": [
        {
          "table": "call",
          "groupBy": [
            "assistantId"
          ],
          "name": "UsageAnalytics",
          "timeRange": {
            "start": "2025-02-10T00:00:00Z",
            "end": "2025-03-12T00:00:00Z"
          },
          "operations": [
            {
              "operation": "sum",
              "column": "duration"
            }
          ]
        }
      ]
    };
    
    // Make API request
    const response = await fetch('https://api.vapi.ai/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer b23dd722-a84d-4bb5-8f8d-463625277d41`
      },
      body: JSON.stringify(analyticsQuery)
    });
    
    const data = await response.json();
    console.log("API RESPONSE STRUCTURE:", JSON.stringify(data, null, 2));
    
    // IMPORTANT: The response is an array where the first item has the results
    // Check if we have results
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("No results array found in API response");
      return 0;
    }
    
    // Get the first item which contains our results
    const firstItem = data[0];
    
    // Check if it has the result array
    if (!firstItem || !firstItem.result || !Array.isArray(firstItem.result)) {
      console.log("No result array found in the first item");
      return 0;
    }
    
    // Now we have the correct results array
    const results = firstItem.result;
    
    // Log all results in a clear format
    console.log(`================================`);
    console.log(`FOUND ${results.length} RESULTS IN API RESPONSE:`);
    results.forEach((item: any, index: number) => {
      console.log(`[${index + 1}] ID: "${item.assistantId}" | Duration: ${item.sumDuration}`);
    });
    console.log(`================================`);
    
    // Get non-zero durations for better visibility
    const nonZeroDurations = results
      .filter((item: any) => item.sumDuration > 0)
      .map((item: any) => ({
        assistantId: item.assistantId,
        sumDuration: item.sumDuration
      }));
    
    if (nonZeroDurations.length > 0) {
      console.log("NON-ZERO DURATIONS FOUND:");
      nonZeroDurations.forEach((item: any, index: number) => {
        console.log(`[${index + 1}] ID: "${item.assistantId}" | Duration: ${item.sumDuration}`);
      });
    }
    
    console.log(`================================`);
    console.log(`ATTEMPTING TO MATCH ASSISTANT ID: "${assistantId}"`);
    
    // Try exact match first
    const exactMatch = results.find((item: any) => item.assistantId === assistantId);
    
    if (exactMatch) {
      console.log(`EXACT MATCH FOUND: ${exactMatch.assistantId} | ${exactMatch.sumDuration}`);
      return exactMatch.sumDuration;
    }
    
    // Try case-insensitive match
    const caseInsensitiveMatch = results.find(
      (item: any) => item.assistantId.toLowerCase() === assistantId.toLowerCase()
    );
    
    if (caseInsensitiveMatch) {
      console.log(`CASE-INSENSITIVE MATCH FOUND: ${caseInsensitiveMatch.assistantId} | ${caseInsensitiveMatch.sumDuration}`);
      return caseInsensitiveMatch.sumDuration;
    }
    
    // If no match, but we have non-zero durations, use the first one
    if (nonZeroDurations.length > 0) {
      const firstNonZero = nonZeroDurations[0];
      console.log(`NO MATCH FOUND. USING FIRST NON-ZERO RESULT: ${firstNonZero.assistantId} | ${firstNonZero.sumDuration}`);
      return firstNonZero.sumDuration;
    }
    
    console.log(`NO SUITABLE MATCH OR FALLBACK FOUND. RETURNING 0.`);
    console.log(`================================`);
    return 0;
  } catch (error) {
    console.error("Error:", error);
    return 0;
  }
}