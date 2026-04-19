import Papa from "papaparse";
import type { ConversionRow } from "./attributionLogic";

/** Normalize common Google / Meta export header variants to canonical keys. */
function rowToConversionRow(row: Record<string, string>): ConversionRow {
  const dateRaw =
    row["Date"]?.trim() ||
    row["Reporting starts"]?.trim() ||
    row["Day"]?.trim() ||
    row["Time"]?.trim() ||
    "";

  const valueRaw =
    row["Conversion value"]?.trim() ||
    row["Purchase conversion value"]?.trim() ||
    row["Conversion value (USD)"]?.trim() ||
    row["Conv. value"]?.trim() ||
    "0";

  const convRaw = row["Conversions"]?.trim() || row["Purchases"]?.trim() || row["All conv."]?.trim() || "1";

  const clickId =
    row["Click ID"]?.trim() ||
    row["GCLID"]?.trim() ||
    row["gclid"]?.trim() ||
    row["FBCLID"]?.trim() ||
    row["fbclid"]?.trim() ||
    "";

  const campaign =
    row["Campaign"]?.trim() ||
    row["Campaign name"]?.trim() ||
    row["Ad set name"]?.trim() ||
    row["Ad name"]?.trim() ||
    "Uploaded Export";

  return {
    date: new Date(dateRaw),
    campaign,
    value: parseFloat(valueRaw.replace(/[^0-9.-]+/g, "") || "0"),
    clickId,
    conversions: parseInt(convRaw || "1", 10),
  };
}

export const processAttributionCsv = (file: File): Promise<ConversionRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = results.data as Record<string, string>[];
          const formattedData: ConversionRow[] = rows.map((row) => rowToConversionRow(row));

          const validData = formattedData.filter(
            (d) => !isNaN(d.value) && Boolean(d.clickId) && !Number.isNaN(d.date.getTime())
          );

          if (validData.length === 0) {
            reject(
              new Error(
                "No valid rows found. Use Date (or Reporting starts), Conversions (or Purchases), Conversion value (or Purchase conversion value), and Click ID (or GCLID / FBCLID)."
              )
            );
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
