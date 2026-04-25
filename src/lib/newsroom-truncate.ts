/** Short labels for selects and rails (long titles clip awkwardly in native option rows). */
export function newsroomTruncateWords(text: string, maxWords = 7): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
}
