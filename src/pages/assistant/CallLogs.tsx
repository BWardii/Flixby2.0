import React, { useEffect, useState } from 'react';
import { PhoneCall, Loader2, RefreshCw, AlertCircle, Filter, Clock, BarChart, Clock3 } from 'lucide-react';
import { getAssistant } from '../../lib/assistant';
import { Assistant } from '../../lib/assistant';
import { calculateMinutesLeft, formatMinutesDisplay } from '../../lib/subscription';

// Define the structure of our API response with updated field names
interface StackbyRecord {
  id: string;
  field: {
    "Assistant ID"?: string;
    "Date"?: string;         // Updated from "start time"
    "Time"?: string;         // Updated from "End Time"
    "ended reason"?: string;
    "Duration"?: string;
    // Legacy fields maintained for backwards compatibility
    "start time"?: string;
    "End Time"?: string;
    [key: string]: any;
  }
}

function CallLogs() {
  const [records, setRecords] = useState<StackbyRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<StackbyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('starter');

  // Function to parse duration strings into minutes
  const parseDuration = (durationStr: string | undefined): number => {
    if (!durationStr) return 0;
    
    // Log the duration string for debugging
    console.log('Parsing duration:', durationStr);
    
    try {
      // Try to handle different formats
      
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
      
      console.warn('Unrecognized duration format:', durationStr);
      return 0;
    } catch (err) {
      console.error('Error parsing duration:', durationStr, err);
      return 0;
    }
  };
  
  // Calculate total minutes from records
  const calculateTotalMinutes = (recordsList: StackbyRecord[]): number => {
    return recordsList.reduce((total, record) => {
      const duration = parseDuration(record.field?.["Duration"]);
      return total + duration;
    }, 0);
  };

  // Fetch the user's assistant data
  const fetchAssistantData = async () => {
    try {
      const assistantData = await getAssistant();
      console.log('Fetched assistant data:', assistantData);
      setAssistant(assistantData);
      return assistantData;
    } catch (err) {
      console.error('Error fetching assistant data:', err);
      return null;
    }
  };

  // Fetch data from Stackby API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching data from Stackby API...');
      
      // Ensure we have the latest assistant data
      const assistantData = assistant || await fetchAssistantData();

      const response = await fetch("https://stackby.com/api/betav1/rowlist/st2YJYpeYLTaqIiBC2/table1", {
        method: 'GET',
        headers: {
          'x-api-key': 'BvxNrYdQ5iGRcWIg'
        }
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Failed to parse API response');
      }

      // Handle different possible response structures
      let recordsData: StackbyRecord[] = [];
      if (Array.isArray(data)) {
        recordsData = data;
      } else if (data && typeof data === 'object') {
        // Try to find an array property in the response
        const arrayProp = Object.keys(data).find(key => Array.isArray(data[key]));
        if (arrayProp) {
          recordsData = data[arrayProp];
        }
      }

      console.log('All records:', recordsData);
      
      // Log the first record's field names to debug
      if (recordsData.length > 0) {
        console.log('First record field names:', Object.keys(recordsData[0].field || {}));
        console.log('Sample duration:', recordsData[0].field?.["Duration"]);
      }
      
      // Store all records
      setRecords(recordsData);
      
      // Calculate total minutes for all records
      const totalMins = calculateTotalMinutes(recordsData);
      console.log('Total minutes calculated:', totalMins);
      setTotalMinutes(totalMins);
      
      // Filter records by Assistant ID if we have assistant data
      if (assistantData?.assistant_id) {
        const userAssistantId = assistantData.assistant_id;
        console.log(`Filtering records for Assistant ID: ${userAssistantId}`);
        
        const userRecords = recordsData.filter(record => {
          const recordAssistantId = record.field?.["Assistant ID"];
          const isMatch = recordAssistantId === userAssistantId;
          if (isMatch) {
            console.log(`Found matching record:`, record);
          }
          return isMatch;
        });
        
        console.log(`Found ${userRecords.length} records for this user's Assistant ID`);
        setFilteredRecords(userRecords);
      } else {
        console.log('No assistant_id available, showing all records');
        setFilteredRecords(recordsData);
      }
    } catch (err) {
      console.error('Error fetching data from Stackby:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate minutes left based on usage and plan
  const updateMinutesLeft = async (usedMinutes: number) => {
    if (!assistant?.assistant_id) {
      console.log('Cannot calculate minutes left: No assistant ID');
      return;
    }
    
    try {
      console.log(`Calculating minutes left for assistant ${assistant.assistant_id} with ${usedMinutes} minutes used`);
      
      // For demo purposes, we're using hardcoded "starter" plan
      // In a real app, you'd fetch the user's actual plan from the database
      const minutes = await calculateMinutesLeft(currentPlan, assistant.assistant_id, usedMinutes);
      console.log(`Minutes left calculation result: ${minutes}`);
      
      // Set minutes left, defaulting to 0 if null
      setMinutesLeft(minutes !== null ? minutes : 0);
    } catch (error) {
      console.error('Error calculating minutes left:', error);
      // Default to 0 minutes left on error
      setMinutesLeft(0);
    }
  };

  // Update minutes left when total minutes or assistant changes
  useEffect(() => {
    if (assistant?.assistant_id) {
      const userMinutes = calculateTotalMinutes(filteredRecords);
      console.log(`Updating minutes left with ${userMinutes} used minutes`);
      updateMinutesLeft(userMinutes);
    }
  }, [totalMinutes, assistant, filteredRecords, currentPlan]);

  // Toggle between all records and user-specific records
  const toggleRecordFilter = () => {
    setShowAllRecords(!showAllRecords);
  };

  // Fetch assistant data and call logs on component mount
  useEffect(() => {
    const initializeData = async () => {
      await fetchAssistantData();
      await fetchData();
    };
    
    initializeData();
  }, []);

  // Records to display based on filter settings
  const displayRecords = showAllRecords ? records : filteredRecords;
  
  // Calculate metrics for displayed records
  const displayTotalMinutes = showAllRecords 
    ? totalMinutes 
    : calculateTotalMinutes(filteredRecords);

  return (
    <div className="pt-20 sm:pt-24 p-4 sm:p-6 md:p-10 max-w-full overflow-x-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">Call Logs</h1>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              {assistant?.assistant_id 
                ? `Viewing calls for Assistant ID: ${assistant.assistant_id.substring(0, 8)}...` 
                : 'View your AI assistant call history'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
            <button
              onClick={toggleRecordFilter}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gray-700/60 hover:bg-gray-700/80 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              <Filter className="h-4 w-4" />
              <span>{showAllRecords ? 'Show My Calls' : 'Show All Calls'}</span>
            </button>
            <button
              onClick={fetchData}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600/60 hover:bg-blue-600/80 text-white rounded-lg transition-colors duration-200 text-sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Total Minutes Used Card */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-800/40 backdrop-blur-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Minutes Used</p>
                  <div className="text-3xl font-bold text-white">
                    {displayTotalMinutes.toFixed(2)}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    {showAllRecords ? 'All assistants' : 'Your assistant only'}
                  </p>
                </div>
                <div className="p-3 bg-blue-900/40 rounded-lg">
                  <Clock className="h-7 w-7 text-blue-400" />
                </div>
              </div>
            </div>
            
            {/* Minutes Left Card - NEW */}
            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl border border-green-800/40 backdrop-blur-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Minutes Left</p>
                  <div className="text-3xl font-bold text-white">
                    {loading ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : minutesLeft === null ? (
                      <span className="text-gray-500">0</span>
                    ) : minutesLeft === -1 ? (
                      "Unlimited"
                    ) : (
                      `${minutesLeft.toFixed(0)}`
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    For current billing period
                  </p>
                </div>
                <div className="p-3 bg-green-900/40 rounded-lg">
                  <Clock3 className="h-7 w-7 text-green-400" />
                </div>
              </div>
            </div>
            
            {/* Number of Calls Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-800/40 backdrop-blur-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Number of Calls</p>
                  <div className="text-3xl font-bold text-white">
                    {displayRecords.length}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    {showAllRecords ? 'Total across all assistants' : 'For your assistant only'}
                  </p>
                </div>
                <div className="p-3 bg-purple-900/40 rounded-lg">
                  <BarChart className="h-7 w-7 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-md overflow-hidden">
          <div className="border-b border-gray-700/50 p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <h2 className="text-base sm:text-lg font-medium text-white flex items-center">
                Call Records
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin text-gray-500" />}
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* Table container with horizontal scroll on mobile */}
            <div className="min-w-full table-wrapper overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center p-8 sm:p-12">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 animate-spin mr-2 sm:mr-3" />
                  <span className="text-sm sm:text-base text-gray-300">Loading data...</span>
                </div>
              ) : error ? (
                <div className="p-6 sm:p-8 text-center">
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 max-w-md mx-auto">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 mx-auto mb-2" />
                    <p className="text-sm sm:text-base text-red-400 mb-2">Error: {error}</p>
                    <button
                      onClick={fetchData}
                      className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-xs sm:text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : displayRecords.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <div className="bg-gray-700/30 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
                    <PhoneCall className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-2">No Call Records Found</h3>
                    <p className="text-sm text-gray-400 mb-4 sm:mb-6">
                      {showAllRecords 
                        ? "There are no call records in the system yet."
                        : "Your assistant hasn't received any calls yet."}
                    </p>
                    {!showAllRecords && (
                      <button
                        onClick={toggleRecordFilter}
                        className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
                      >
                        Show All Calls
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Assistant ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
                    {displayRecords.map((record, index) => (
                      <tr key={record.id || index} className={`hover:bg-gray-700/30 ${record.field?.["Assistant ID"] === assistant?.assistant_id ? 'bg-blue-900/10' : ''}`}>
                        <td className="px-4 py-3 text-sm text-gray-300 font-mono truncate max-w-[200px]">
                          <div className="flex items-center">
                            {record.field?.["Assistant ID"] === assistant?.assistant_id && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            )}
                            {record.field?.["Assistant ID"] || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {/* Try new field name first, fall back to old name if needed */}
                          {record.field?.["Date"] || record.field?.["start time"] || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {/* Try new field name first, fall back to old name if needed */}
                          {record.field?.["Time"] || record.field?.["End Time"] || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.field?.["ended reason"] === "completed" 
                              ? "bg-green-900/30 text-green-400"
                              : record.field?.["ended reason"]?.includes("customer") 
                              ? "bg-blue-900/30 text-blue-400"
                              : record.field?.["ended reason"]?.includes("fail") 
                              ? "bg-red-900/30 text-red-400" 
                              : "bg-yellow-900/30 text-yellow-400"
                          }`}>
                            {record.field?.["ended reason"] || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {record.field?.["Duration"] || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Footer data with metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-400 mt-2 sm:mt-4">
          <div>
            {assistant?.assistant_id && (
              <span className="text-xs sm:text-sm">
                Full Assistant ID: {assistant.assistant_id}
              </span>
            )}
          </div>
          <div className="mt-2 sm:mt-0">
            {displayRecords.length} {displayRecords.length === 1 ? 'record' : 'records'} | 
            {showAllRecords ? ' All Calls' : ' My Calls Only'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallLogs;