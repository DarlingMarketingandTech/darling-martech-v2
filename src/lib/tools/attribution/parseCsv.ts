import Papa from "papaparse";
import type { ConversionRow } from "./attributionLogic";

export const processAttributionCsv = (file: File): Promise<ConversionRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = results.data as Record<string, string>[];
          const formattedData: ConversionRow[] = rows.map((row) => ({
            date: new Date(row["Date"]),
            campaign: row["Campaign"] || "Uploaded Export",
            value: parseFloat(row["Conversion value"]?.replace(/[^0-9.-]+/g, "") || "0"),
            clickId: row["Click ID"] || row["GCLID"] || row["FBCLID"],
            conversions: parseInt(row["Conversions"] || "1", 10),
          }));

          const validData = formattedData.filter((d) => !isNaN(d.value) && d.clickId);

          if (validData.length === 0) {
            reject(new Error("No valid rows found. Ensure Date, Conversion value, and Click ID exist."));
          } else {
            resolve(validData);
          }
        } catch {
          reject(new Error("CSV format error. Please check your headers."));
        }
      },
      error: (error) => reject(new Error(error.message)),
    });
  });
};

export const getDemoData = (): ConversionRow[] => {
  const today = new Date();
  const generateDate = (daysAgo: number) => new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);

  return [
    { date: generateDate(14), campaign: "Prospecting", value: 0, clickId: "user_1", conversions: 0 },
    { date: generateDate(2), campaign: "Retargeting", value: 1200, clickId: "user_1", conversions: 1 },
    { date: generateDate(30), campaign: "Brand Search", value: 0, clickId: "user_2", conversions: 0 },
    { date: generateDate(10), campaign: "Prospecting", value: 0, clickId: "user_2", conversions: 0 },
    { date: generateDate(1), campaign: "Retargeting", value: 850, clickId: "user_2", conversions: 1 },
    { date: generateDate(5), campaign: "Prospecting", value: 2500, clickId: "user_3", conversions: 1 },
  ];
};
