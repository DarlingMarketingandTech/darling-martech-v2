/** Matches hub grid card `meta-label` copy: slug segments, title-cased (CSS uppercase via `.meta-label`). */
export function problemHubMetaLabel(slug: string): string {
  return slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
