import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/app", "src/components"];
const ALLOWED = [
  "aria-label",
  "className",
  "data-",
  "href",
  "id",
  "role",
  "type",
];

function walk(dir: string, files: string[] = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    if (stat.isFile() && /\.(tsx|jsx)$/.test(full)) files.push(full);
  }
  return files;
}

let warnings = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const source = readFileSync(file, "utf8");
    const hasDataImport = /from "@\/data\//.test(source);
    const jsxTextMatches = [...source.matchAll(/>\s*([A-Z][^<{]{16,})\s*</g)];

    for (const match of jsxTextMatches) {
      const text = match[1].trim();
      if (ALLOWED.some((token) => text.includes(token))) continue;

      warnings += 1;
      const line = source.slice(0, match.index ?? 0).split("\n").length;
      console.warn(
        `${file}:${line} possible hard-coded approved copy: "${text.slice(0, 96)}${text.length > 96 ? "..." : ""}"`
      );
    }

    if (jsxTextMatches.length > 0 && !hasDataImport) {
      console.warn(`${file} has JSX copy candidates but no @/data import.`);
    }
  }
}

console.log(`Hard-coded copy audit complete with ${warnings} warning(s).`);
