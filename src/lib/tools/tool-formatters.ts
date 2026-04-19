const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  return CURRENCY_FORMATTER.format(Math.round(value));
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return NUMBER_FORMATTER.format(Math.round(value));
}

export function formatPercent(decimal: number, fractionDigits = 1): string {
  if (!Number.isFinite(decimal)) return "0%";
  return `${(decimal * 100).toFixed(fractionDigits)}%`;
}

export function formatMonths(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value) || value <= 0) return "n/a";
  return `${value.toFixed(fractionDigits)} months`;
}

export function formatMultiplier(value: number, fractionDigits = 2): string {
  if (!Number.isFinite(value) || value <= 0) return "0×";
  return `${value.toFixed(fractionDigits)}×`;
}
