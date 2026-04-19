export type ConversionRow = {
  date: Date;
  campaign: string;
  value: number;
  clickId: string;
  conversions: number;
};

export type AttributionResults = {
  // Core Revenue Models
  firstTouch: number;
  lastTouch: number;
  linear: number;
  timeDecay: number;

  // Advanced Journey Insights
  averageDaysToClose: number;
  averageTouchpoints: number;
  totalJourneys: number;
};

export const calculateModels = (data: ConversionRow[]): AttributionResults => {
  // Group rows by unique ClickID to reconstruct the journeys
  const journeys = data.reduce(
    (acc, row) => {
      if (!acc[row.clickId]) acc[row.clickId] = [];
      acc[row.clickId].push(row);
      return acc;
    },
    {} as Record<string, ConversionRow[]>
  );

  const results: AttributionResults = {
    firstTouch: 0,
    lastTouch: 0,
    linear: 0,
    timeDecay: 0,
    averageDaysToClose: 0,
    averageTouchpoints: 0,
    totalJourneys: 0,
  };

  const journeyKeys = Object.keys(journeys);
  results.totalJourneys = journeyKeys.length;

  // Prevent divide-by-zero if empty data is passed
  if (results.totalJourneys === 0) return results;

  let totalDaysAllJourneys = 0;
  let totalTouchpointsAllJourneys = 0;

  journeyKeys.forEach((clickId) => {
    const touchpoints = journeys[clickId];

    // Sort touchpoints chronologically
    const sorted = touchpoints.sort((a, b) => a.date.getTime() - b.date.getTime());

    const firstTouch = sorted[0];
    const finalTouch = sorted[sorted.length - 1];

    // We assume the final touchpoint holds the actual conversion value
    const totalVal = finalTouch.value;

    // --- 1. REVENUE MATH ---
    results.firstTouch += totalVal;
    results.lastTouch += totalVal;

    // For a single-channel CSV, total Linear and Time Decay revenue remain equal to total value,
    // but this prepares the engine for multi-channel spread calculations.
    results.linear += totalVal;

    // Time Decay placeholder: same total as other single-path rows until multi-touch credit split is added
    results.timeDecay += totalVal;

    // --- 2. JOURNEY INSIGHT MATH ---
    // Calculate the exact time gap between the opener and the closer
    const daysToClose = (finalTouch.date.getTime() - firstTouch.date.getTime()) / (1000 * 3600 * 24);
    totalDaysAllJourneys += daysToClose;

    // Count how many clicks it took to get this conversion
    totalTouchpointsAllJourneys += sorted.length;
  });

  // --- 3. AGGREGATE AVERAGES ---
  results.averageDaysToClose = totalDaysAllJourneys / results.totalJourneys;
  results.averageTouchpoints = totalTouchpointsAllJourneys / results.totalJourneys;

  return results;
};
