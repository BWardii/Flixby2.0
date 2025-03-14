import { getCurrentUser } from './auth';
import { getAssistant } from './assistant';

// Stackby API key and configuration
const STACKBY_API_KEY = 'BvxNrYdQ5iGRcWIg';

// Stackby API endpoint
const STACKBY_API_URL = 'https://stackby.com/api/betav1/rowlist/st2YJYpeYLTaqIiBC2/table1';

// Interface for call log data matching Stackby's exact field structure
export interface CallLog {
  // Stackby primary fields - exact names from API
  "Created At"?: string;
  "Assistant ID"?: string;
  "Start Time"?: string;
  "End Time"?: string;
  "ended reason"?: string;
  "Ended Reason"?: string; // Both versions for flexibility
  "Duration"?: string;
  
  // Fallback fields - camelCase and snake_case variations
  createdAt?: string;
  created_at?: string;
  
  assistantId?: string;
  assistant_id?: string;
  
  startTime?: string;
  start_time?: string;
  
  endTime?: string;
  end_time?: string;
  
  endedReason?: string;
  ended_reason?: string;
  
  duration?: string;
  
  // Allow any other fields that might exist
  [key: string]: any;
}

interface ApiResponse {
  rows?: CallLog[];
  data?: CallLog[];
  records?: CallLog[];
  [key: string]: any; // Allow other top-level properties
}

/**
 * Fetches call logs directly from Stackby API
 * @returns Array of call logs
 */
export async function fetchCallLogsFromStackby(): Promise<CallLog[]> {
  console.log('Fetching call logs from Stackby...');
  
  try {
    const response = await fetch(STACKBY_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': STACKBY_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    
    // First get the raw response text for debugging
    const rawText = await response.text();
    console.log('Raw Stackby Response:', rawText);
    
    // Try to parse as JSON
    let data: ApiResponse;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('Failed to parse Stackby response as JSON:', e);
      return [];
    }
    
    console.log('Full Stackby Response Structure:', JSON.stringify(data, null, 2));
    
    // Try to access logs from different possible response structures
    let logs: CallLog[] = [];
    
    if (data.rows && Array.isArray(data.rows)) {
      logs = data.rows;
      console.log('Found logs in data.rows');
    } else if (data.data && Array.isArray(data.data)) {
      logs = data.data;
      console.log('Found logs in data.data');
    } else if (data.records && Array.isArray(data.records)) {
      logs = data.records;
      console.log('Found logs in data.records');
    } else if (Array.isArray(data)) {
      logs = data as unknown as CallLog[];
      console.log('Data is directly an array');
    } else {
      // Try to find an array in the data
      for (const key in data) {
        if (Array.isArray(data[key])) {
          logs = data[key] as CallLog[];
          console.log(`Found logs in data.${key}`);
          break;
        }
      }
    }
    
    console.log(`Fetched ${logs.length} call logs from Stackby`);
    
    // Log the complete structure of the first few records for debugging
    if (logs.length > 0) {
      console.log('First log complete structure:', JSON.stringify(logs[0], null, 2));
      
      // Also log all available fields in the first record
      const firstRecord = logs[0];
      console.log('Available fields in first record:', Object.keys(firstRecord));
      
      // Show sample values of a few records - using direct field access with fallbacks
      logs.slice(0, 3).forEach((log, i) => {
        console.log(`Record ${i+1} preview:`, {
          "Created At": log["Created At"] || log.createdAt || log.created_at,
          "Assistant ID": log["Assistant ID"] || log.assistantId || log.assistant_id,
          "Start Time": log["Start Time"] || log.startTime || log.start_time,
          "End Time": log["End Time"] || log.endTime || log.end_time,
          "ended reason": log["ended reason"] || log["Ended Reason"] || log.endedReason || log.ended_reason,
          "Duration": log["Duration"] || log.duration
        });
      });
    }
    
    return logs;
  } catch (error) {
    console.error('Error fetching call logs from Stackby:', error);
    return []; // Return empty array on error
  }
}

/**
 * Fetches call logs for the current user's assistant
 * @returns Array of call log records for the current user's assistant
 */
export async function fetchCurrentUserCallLogs(): Promise<CallLog[]> {
  try {
    // Always return all logs from Stackby for testing purposes
    return await fetchCallLogsFromStackby();
  } catch (error) {
    console.error('Error fetching current user call logs:', error);
    return [];
  }
} 