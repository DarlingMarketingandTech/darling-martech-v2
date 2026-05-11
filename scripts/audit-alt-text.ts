import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/app", "src/components"];
const IMAGE_PATTERNS = [/<Image\b[^>]*>/g, /<CloudinaryImage\b[^>]*>/g, /<img\b[^>]*>/g];

function walk(dir: string, files: string[] = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    if (stat.isFile() && /\.(tsx|jsx|mdx)$/.test(full)) files.push(full);
  }
  return files;
}

let failures = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const source = readFileSync(file, "utf8");

    for (const pattern of IMAGE_PATTERNS) {
      for (const match of source.matchAll(pattern)) {
        const tag = match[0];
        if (!/\balt=/.test(tag)) {
          failures += 1;
          const before = source.slice(0, match.index ?? 0);
          const line = before.split("\n").length;
          console.error(`${file}:${line} image is missing alt text`);
        }
      }
    }
  }
}

if (failures > 0) {
  console.error(`\nAlt text audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("Alt text audit passed.");
